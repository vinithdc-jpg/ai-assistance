import Ticket from "@/models/Ticket";
import ActivityLog from "@/models/ActivityLog";
import User from "@/models/User";
import {
  ACTIVITY_TYPE,
  NOTIFICATION_TYPE,
  TICKET_STATUS,
  USER_ROLE,
} from "@/lib/constants";
import {
  logActivity,
  createNotification,
  createTicketConversation,
} from "@/lib/ticketUtils";

/**
 * Resolve customer id from populated or raw ticket reference.
 */
export function getTicketCustomerId(ticket) {
  return ticket.customer?._id?.toString() ?? ticket.customer?.toString();
}

/**
 * Check if user can view a ticket.
 */
export function canAccessTicket(user, ticket) {
  if (!user || !ticket) return false;
  if (user.role !== USER_ROLE.CUSTOMER) return true;
  return getTicketCustomerId(ticket) === user.userId;
}

/**
 * Fields a role may update on a ticket.
 */
export function getAllowedUpdateFields(role) {
  if (role === USER_ROLE.CUSTOMER) return ["title", "description", "tags"];
  return [
    "title",
    "description",
    "priority",
    "category",
    "assignedAgent",
    "tags",
    "status",
  ];
}

/**
 * Create a new support ticket with conversation and activity log.
 */
export async function createTicket({ user, data }) {
  const ticket = await Ticket.create({
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category,
    priority: data.priority ?? "medium",
    tags: data.tags ?? [],
    customer: user.userId,
  });

  await createTicketConversation(ticket, user.userId);

  await logActivity({
    ticketId: ticket._id,
    actorId: user.userId,
    actorRole: user.role,
    type: ACTIVITY_TYPE.CREATED,
    description: `Ticket #${ticket.ticketNumber} was created`,
  });

  // Notify all agents/admins about the new ticket
  const staff = await User.find({
    role: { $in: [USER_ROLE.AGENT, USER_ROLE.ADMIN] },
  })
    .select("_id")
    .lean();

  if (staff.length > 0) {
    await createNotification({
      recipientIds: staff.map((s) => s._id),
      type: NOTIFICATION_TYPE.NEW_TICKET,
      title: `New ticket #${ticket.ticketNumber}`,
      body: data.title.trim().slice(0, 120),
      ticketId: ticket._id,
    });
  }

  return Ticket.findById(ticket._id)
    .populate("customer", "name email")
    .populate("assignedAgent", "name email")
    .lean();
}

/**
 * Apply ticket updates with activity logging and notifications.
 */
export async function updateTicket({ ticket, user, updates }) {
  const prevStatus = ticket.status;
  const prevPriority = ticket.priority;
  const prevAgent = ticket.assignedAgent?.toString() ?? null;

  Object.assign(ticket, updates);
  await ticket.save();

  if (updates.priority && updates.priority !== prevPriority) {
    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: ACTIVITY_TYPE.PRIORITY_CHANGED,
      description: `Priority changed from ${prevPriority} to ${updates.priority}`,
      metadata: { from: prevPriority, to: updates.priority },
    });
  }

  if (
    updates.assignedAgent !== undefined &&
    (updates.assignedAgent?.toString() ?? null) !== prevAgent
  ) {
    const agentName = updates.assignedAgent
      ? (await User.findById(updates.assignedAgent).select("name").lean())?.name ??
        "agent"
      : "unassigned";

    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: ACTIVITY_TYPE.ASSIGNED,
      description: `Ticket assigned to ${agentName}`,
      metadata: { agentId: updates.assignedAgent },
    });

    if (updates.assignedAgent) {
      await createNotification({
        recipientIds: [updates.assignedAgent],
        type: NOTIFICATION_TYPE.ASSIGNMENT,
        title: `Ticket #${ticket.ticketNumber} assigned to you`,
        body: ticket.title.slice(0, 120),
        ticketId: ticket._id,
      });
    }
  }

  if (updates.status && updates.status !== prevStatus) {
    const activityType =
      updates.status === TICKET_STATUS.CLOSED
        ? ACTIVITY_TYPE.CLOSED
        : prevStatus === TICKET_STATUS.CLOSED
          ? ACTIVITY_TYPE.REOPENED
          : ACTIVITY_TYPE.STATUS_CHANGED;

    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: activityType,
      description: `Status changed from ${prevStatus} to ${updates.status}`,
      metadata: { from: prevStatus, to: updates.status },
    });

    await createNotification({
      recipientIds: [ticket.customer],
      type: NOTIFICATION_TYPE.STATUS_UPDATE,
      title: `Ticket #${ticket.ticketNumber} status updated`,
      body: `Status changed to ${updates.status.replace(/_/g, " ")}`,
      ticketId: ticket._id,
    });
  }

  return Ticket.findById(ticket._id)
    .populate("customer", "name email")
    .populate("assignedAgent", "name email")
    .lean();
}

/**
 * Fetch paginated activity log for a ticket.
 */
export async function getTicketActivity(ticketId, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  const filter = { ticket: ticketId };

  const [data, total] = await Promise.all([
    ActivityLog.find(filter)
      .populate("actor", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    ActivityLog.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

/**
 * lib/ticketUtils.js
 * Shared server-side helpers for the Ticket Management module.
 * All functions are async and intended for use in API Route Handlers.
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import Conversation from "@/models/Conversation";
import ActivityLog from "@/models/ActivityLog";
import Notification from "@/models/Notification";
import { ACTIVITY_TYPE, NOTIFICATION_TYPE } from "@/lib/constants";

// ─────────────────────────────────────────────
// Auth helpers — read injected headers from proxy
// ─────────────────────────────────────────────

/**
 * Extract the authenticated user from the request headers
 * (set by the proxy middleware after JWT verification).
 * Returns { userId, email } or null if unauthenticated.
 */
export function getUserFromRequest(req) {
  const userId = req.headers.get("x-user-id");
  const email = req.headers.get("x-user-email");
  const role = req.headers.get("x-user-role") ?? "customer";
  if (!userId) return null;
  return { userId, email, role };
}

// ─────────────────────────────────────────────
// Ticket creation helpers
// ─────────────────────────────────────────────

/**
 * Create a Conversation linked to the ticket and set it on the ticket doc.
 * Must be called after the ticket has been saved (so ticket._id exists).
 */
export async function createTicketConversation(ticket, customerId) {
  const conversation = await Conversation.create({
    ticket: ticket._id,
    participants: [customerId],
    lastMessageAt: null,
  });

  ticket.conversation = conversation._id;
  await ticket.save();

  return conversation;
}

/**
 * Log a ticket activity event.
 */
export async function logActivity({
  ticketId,
  actorId,
  actorRole = "system",
  type,
  description,
  metadata = {},
}) {
  return ActivityLog.create({
    ticket: ticketId,
    actor: actorId,
    actorRole,
    type,
    description,
    metadata,
  });
}

/**
 * Create a notification for one or more recipients.
 */
export async function createNotification({
  recipientIds,
  type,
  title,
  body,
  ticketId = null,
}) {
  if (!recipientIds || recipientIds.length === 0) return;
  const docs = recipientIds.map((r) => ({
    recipient: r,
    type,
    title,
    body,
    ticket: ticketId,
  }));
  return Notification.insertMany(docs);
}

// ─────────────────────────────────────────────
// Query helpers
// ─────────────────────────────────────────────

/**
 * Build a Mongoose filter object from URL query params.
 * Supports: status, priority, category, search, assignedAgent.
 */
export function buildTicketFilter(searchParams, extraFilter = {}) {
  const filter = { ...extraFilter };

  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const assignedAgent = searchParams.get("assignedAgent");
  const isClosed = searchParams.get("isClosed");

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (assignedAgent) filter.assignedAgent = assignedAgent;
  if (isClosed !== null && isClosed !== undefined) {
    filter.isClosed = isClosed === "true";
  }

  if (search) {
    filter.$or = [
      { ticketNumber: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  return filter;
}

/**
 * Paginate a Mongoose query.
 * Returns { data, pagination: { page, limit, total, pages } }
 */
export async function paginateQuery(Model, filter, options = {}) {
  await dbConnect();

  const page = Math.max(1, parseInt(options.page ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(options.limit ?? "15", 10)));
  const skip = (page - 1) * limit;
  const sort = options.sort ?? { createdAt: -1 };
  const populate = options.populate ?? [];

  let query = Model.find(filter).sort(sort).skip(skip).limit(limit);

  for (const p of populate) {
    query = query.populate(p);
  }

  const [data, total] = await Promise.all([query.lean(), Model.countDocuments(filter)]);

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

// Standard JSON response helpers

export function ok(data, status = 200) {
  return Response.json({ success: true, ...data }, { status });
}

export function err(message, status = 400, extra = {}) {
  return Response.json({ success: false, message, ...extra }, { status });
}

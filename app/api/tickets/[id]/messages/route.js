/**
 * app/api/tickets/[id]/messages/route.js
 * GET  /api/tickets/:id/messages  — list messages in a ticket conversation
 * POST /api/tickets/:id/messages  — post a reply (or internal note)
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import Message from "@/models/Message";
import Conversation from "@/models/Conversation";
import {
  getUserFromRequest,
  logActivity,
  createNotification,
  ok,
  err,
} from "@/lib/ticketUtils";
import { ACTIVITY_TYPE, NOTIFICATION_TYPE } from "@/lib/constants";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────
// GET /api/tickets/:id/messages
// ─────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id).lean();
    if (!ticket) return err("Ticket not found", 404);

    if (
      user.role === "customer" &&
      ticket.customer.toString() !== user.userId
    ) {
      return err("Forbidden", 403);
    }

    const query = { ticket: id };
    // Customers cannot see internal notes
    if (user.role === "customer") query.isInternal = false;

    const messages = await Message.find(query)
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .lean();

    return ok({ messages });
  } catch (error) {
    console.error("GET /api/tickets/:id/messages error:", error);
    return err("Internal server error", 500);
  }
}

// ─────────────────────────────────────────────
// POST /api/tickets/:id/messages
// ─────────────────────────────────────────────
export async function POST(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id).populate("customer", "_id");
    if (!ticket) return err("Ticket not found", 404);

    if (ticket.isClosed) return err("Ticket is closed and cannot receive replies", 400);

    if (
      user.role === "customer" &&
      ticket.customer._id.toString() !== user.userId
    ) {
      return err("Forbidden", 403);
    }

    const body = await request.json();
    const { content, isInternal = false } = body;

    if (!content?.trim()) return err("Message content is required", 400);

    // Only agents/admins can post internal notes
    if (isInternal && user.role === "customer") {
      return err("Customers cannot post internal notes", 403);
    }

    const message = await Message.create({
      conversation: ticket.conversation,
      ticket: ticket._id,
      sender: user.userId,
      senderRole: user.role,
      body: content.trim(),
      isInternal,
      readBy: [user.userId],
    });

    // Update conversation metadata
    await Conversation.findByIdAndUpdate(ticket.conversation, {
      lastMessageAt: new Date(),
      $inc: { messageCount: 1 },
      $addToSet: { participants: user.userId },
    });

    // Set first response time if agent replies for the first time
    if (user.role !== "customer" && !ticket.firstResponseAt) {
      ticket.firstResponseAt = new Date();
      await ticket.save();
    }

    // Activity log
    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: isInternal ? ACTIVITY_TYPE.NOTE_ADDED : ACTIVITY_TYPE.REPLIED,
      description: isInternal
        ? "Internal note added"
        : `Reply sent by ${user.role}`,
    });

    // Notify the other party
    const notifyId =
      user.userId === ticket.customer._id.toString()
        ? ticket.assignedAgent
        : ticket.customer._id;

    if (notifyId && !isInternal) {
      await createNotification({
        recipientIds: [notifyId],
        type: NOTIFICATION_TYPE.NEW_REPLY,
        title: `New reply on #${ticket.ticketNumber}`,
        body: content.trim().slice(0, 120),
        ticketId: ticket._id,
      });
    }

    const populated = await Message.findById(message._id)
      .populate("sender", "name email")
      .lean();

    return ok({ message: populated }, 201);
  } catch (error) {
    console.error("POST /api/tickets/:id/messages error:", error);
    return err("Internal server error", 500);
  }
}

/**
 * app/api/tickets/[id]/route.js
 * GET    /api/tickets/:id  — get one ticket (full detail)
 * PUT    /api/tickets/:id  — update ticket (title, desc, priority, assignedAgent, tags)
 * DELETE /api/tickets/:id  — delete ticket (admin only)
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import {
  getUserFromRequest,
  logActivity,
  ok,
  err,
} from "@/lib/ticketUtils";
import { ACTIVITY_TYPE, TICKET_PRIORITY, TICKET_CATEGORY } from "@/lib/constants";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────
// GET /api/tickets/:id
// ─────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .populate("conversation")
      .lean();

    if (!ticket) return err("Ticket not found", 404);

    // Customers can only view their own tickets
    if (
      user.role === "customer" &&
      ticket.customer._id.toString() !== user.userId
    ) {
      return err("Forbidden", 403);
    }

    return ok({ ticket });
  } catch (error) {
    console.error("GET /api/tickets/:id error:", error);
    return err("Internal server error", 500);
  }
}

// ─────────────────────────────────────────────
// PUT /api/tickets/:id
// ─────────────────────────────────────────────
export async function PUT(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id);
    if (!ticket) return err("Ticket not found", 404);

    // Customers cannot update tickets that are not theirs
    if (
      user.role === "customer" &&
      ticket.customer.toString() !== user.userId
    ) {
      return err("Forbidden", 403);
    }

    const body = await request.json();
    const allowedFields =
      user.role === "customer"
        ? ["title", "description", "tags"]
        : ["title", "description", "priority", "category", "assignedAgent", "tags"];

    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    // Validate priority if changed
    if (updates.priority && !Object.values(TICKET_PRIORITY).includes(updates.priority)) {
      return err("Invalid priority value", 400);
    }
    if (updates.category && !Object.values(TICKET_CATEGORY).includes(updates.category)) {
      return err("Invalid category value", 400);
    }

    const prevPriority = ticket.priority;
    const prevAgent = ticket.assignedAgent?.toString();

    Object.assign(ticket, updates);
    await ticket.save();

    // Log relevant activity changes
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

    if (updates.assignedAgent && updates.assignedAgent !== prevAgent) {
      await logActivity({
        ticketId: ticket._id,
        actorId: user.userId,
        actorRole: user.role,
        type: ACTIVITY_TYPE.ASSIGNED,
        description: `Ticket assigned to agent`,
        metadata: { agentId: updates.assignedAgent },
      });
    }

    const updated = await Ticket.findById(id)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .lean();

    return ok({ ticket: updated });
  } catch (error) {
    console.error("PUT /api/tickets/:id error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return err(messages[0], 400);
    }
    return err("Internal server error", 500);
  }
}

// ─────────────────────────────────────────────
// DELETE /api/tickets/:id  (admin only)
// ─────────────────────────────────────────────
export async function DELETE(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);
    if (user.role !== "admin") return err("Forbidden — admins only", 403);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) return err("Ticket not found", 404);

    return ok({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/tickets/:id error:", error);
    return err("Internal server error", 500);
  }
}

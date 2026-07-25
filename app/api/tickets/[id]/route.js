/**
 * app/api/tickets/[id]/route.js
 * GET    /api/tickets/:id  — get one ticket (full detail)
 * PUT    /api/tickets/:id  — update ticket
 * DELETE /api/tickets/:id  — delete ticket (admin only)
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import { getUserFromRequest, ok, err } from "@/lib/ticketUtils";
import {
  canAccessTicket,
  getAllowedUpdateFields,
  updateTicket,
} from "@/lib/services/ticketService";
import { validateUpdateTicket } from "@/lib/validation/ticketValidation";

export const dynamic = "force-dynamic";

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
    if (!canAccessTicket(user, ticket)) return err("Forbidden", 403);

    return ok({ ticket });
  } catch (error) {
    console.error("GET /api/tickets/:id error:", error);
    return err("Internal server error", 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id);
    if (!ticket) return err("Ticket not found", 404);
    if (!canAccessTicket(user, ticket)) return err("Forbidden", 403);

    const body = await request.json();
    const validation = validateUpdateTicket(body, user.role);
    if (!validation.valid) return err(validation.errors[0], 400);

    const allowedFields = getAllowedUpdateFields(user.role);
    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    if (Object.keys(updates).length === 0) {
      return err("No valid fields to update", 400);
    }

    // Customers cannot change status of closed tickets
    if (
      user.role === "customer" &&
      ticket.isClosed &&
      (updates.title || updates.description)
    ) {
      return err("Cannot edit a closed ticket", 400);
    }

    const updated = await updateTicket({ ticket, user, updates });
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

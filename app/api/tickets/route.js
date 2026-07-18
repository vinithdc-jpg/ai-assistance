/**
 * app/api/tickets/route.js
 * GET  /api/tickets  — list tickets (filtered, paginated)
 * POST /api/tickets  — create a new ticket
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import {
  getUserFromRequest,
  buildTicketFilter,
  paginateQuery,
  createTicketConversation,
  logActivity,
  createNotification,
  ok,
  err,
} from "@/lib/ticketUtils";
import { ACTIVITY_TYPE, NOTIFICATION_TYPE, TICKET_CATEGORY, TICKET_PRIORITY } from "@/lib/constants";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────
// GET /api/tickets
// ─────────────────────────────────────────────
export async function GET(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();

    const { searchParams } = request.nextUrl;

    // Customers only see their own tickets; agents/admins see all
    const extraFilter =
      user.role === "customer" ? { customer: user.userId } : {};

    const filter = buildTicketFilter(searchParams, extraFilter);

    const result = await paginateQuery(Ticket, filter, {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sort: { createdAt: -1 },
      populate: [
        { path: "customer", select: "name email" },
        { path: "assignedAgent", select: "name email" },
      ],
    });

    return ok(result);
  } catch (error) {
    console.error("GET /api/tickets error:", error);
    return err("Internal server error", 500);
  }
}

// ─────────────────────────────────────────────
// POST /api/tickets
// ─────────────────────────────────────────────
export async function POST(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    const body = await request.json();
    const { title, description, category, priority, tags } = body;

    // Validation
    if (!title?.trim()) return err("Title is required", 400);
    if (!description?.trim()) return err("Description is required", 400);
    if (!category) return err("Category is required", 400);
    if (!Object.values(TICKET_CATEGORY).includes(category))
      return err("Invalid category", 400);
    if (priority && !Object.values(TICKET_PRIORITY).includes(priority))
      return err("Invalid priority", 400);

    await dbConnect();

    // Create the ticket
    const ticket = await Ticket.create({
      title: title.trim(),
      description: description.trim(),
      category,
      priority: priority ?? "medium",
      tags: tags ?? [],
      customer: user.userId,
    });

    // Create a linked conversation thread
    await createTicketConversation(ticket, user.userId);

    // Log creation activity
    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: ACTIVITY_TYPE.CREATED,
      description: `Ticket #${ticket.ticketNumber} was created`,
    });

    // Re-fetch with populated fields
    const populated = await Ticket.findById(ticket._id)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .lean();

    return ok({ ticket: populated }, 201);
  } catch (error) {
    console.error("POST /api/tickets error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return err(messages[0], 400);
    }
    return err("Internal server error", 500);
  }
}

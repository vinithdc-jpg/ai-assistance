/**
 * GET /api/tickets/:id/activity — ticket activity history
 */

import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import { getUserFromRequest, ok, err } from "@/lib/ticketUtils";
import {
  canAccessTicket,
  getTicketActivity,
} from "@/lib/services/ticketService";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id).lean();
    if (!ticket) return err("Ticket not found", 404);
    if (!canAccessTicket(user, ticket)) return err("Forbidden", 403);

    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const result = await getTicketActivity(id, { page, limit });
    return ok(result);
  } catch (error) {
    console.error("GET /api/tickets/:id/activity error:", error);
    return err("Internal server error", 500);
  }
}

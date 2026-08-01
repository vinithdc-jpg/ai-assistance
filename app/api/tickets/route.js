import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import {
  getUserFromRequest,
  buildTicketFilter,
  paginateQuery,
  ok,
  err,
} from "@/lib/ticketUtils";
import { createTicket } from "@/lib/services/ticketService";
import {
  validateCreateTicket,
  buildSortOption,
} from "@/lib/validation/ticketValidation";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();

    const { searchParams } = request.nextUrl;

    const extraFilter =
      user.role === "customer" ? { customer: user.userId } : {};

    const filter = buildTicketFilter(searchParams, extraFilter);
    const sort = buildSortOption(
      searchParams.get("sortBy"),
      searchParams.get("sortOrder")
    );

    const result = await paginateQuery(Ticket, filter, {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sort,
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

export async function POST(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    const body = await request.json();
    const validation = validateCreateTicket(body);
    if (!validation.valid) return err(validation.errors[0], 400);

    await dbConnect();

    const ticket = await createTicket({
      user,
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        priority: body.priority,
        tags: body.tags,
      },
    });

    return ok({ ticket }, 201);
  } catch (error) {
    console.error("POST /api/tickets error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return err(messages[0], 400);
    }
    return err("Internal server error", 500);
  }
}

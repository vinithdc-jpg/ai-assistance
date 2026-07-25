import { headers } from "next/headers";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import Message from "@/models/Message";
import ActivityLog from "@/models/ActivityLog";
import User from "@/models/User";
import TicketDetail from "@/components/tickets/TicketDetail";
import { canAccessTicket } from "@/lib/services/ticketService";

async function getAuthUser() {
  const h = await headers();
  const userId = h.get("x-user-id");
  const role = h.get("x-user-role") ?? "customer";
  if (!userId) return null;
  return { userId, role };
}

export default async function TicketDetailPage({ params }) {
  const { id } = await params;
  const user = await getAuthUser();
  if (!user) notFound();

  await dbConnect();

  const ticket = await Ticket.findById(id)
    .populate("customer", "name email")
    .populate("assignedAgent", "name email")
    .lean();

  if (!ticket || !canAccessTicket(user, ticket)) notFound();

  const messageQuery = { ticket: id };
  if (user.role === "customer") messageQuery.isInternal = false;

  const [messages, activities, agents] = await Promise.all([
    Message.find(messageQuery)
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .lean(),
    ActivityLog.find({ ticket: id })
      .populate("actor", "name email")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
    user.role !== "customer"
      ? User.find({ role: { $in: ["agent", "admin"] } })
          .select("name email role")
          .sort({ name: 1 })
          .lean()
      : [],
  ]);

  return (
    <TicketDetail
      ticket={JSON.parse(JSON.stringify(ticket))}
      messages={JSON.parse(JSON.stringify(messages))}
      activities={JSON.parse(JSON.stringify(activities))}
      userRole={user.role}
      agents={JSON.parse(JSON.stringify(agents))}
    />
  );
}

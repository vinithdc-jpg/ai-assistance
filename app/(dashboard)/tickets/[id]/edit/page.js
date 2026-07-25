import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import TicketForm from "@/components/tickets/TicketForm";
import { canAccessTicket } from "@/lib/services/ticketService";

async function getAuthUser() {
  const h = await headers();
  const userId = h.get("x-user-id");
  const role = h.get("x-user-role") ?? "customer";
  if (!userId) return null;
  return { userId, role };
}

export default async function EditTicketPage({ params }) {
  const { id } = await params;
  const user = await getAuthUser();
  if (!user) notFound();

  await dbConnect();

  const ticket = await Ticket.findById(id).lean();
  if (!ticket || !canAccessTicket(user, ticket)) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href={`/tickets/${id}`}
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
        >
          ← Back to ticket
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Ticket</h1>
      </div>

      <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
        <TicketForm
          mode="edit"
          initialData={JSON.parse(JSON.stringify(ticket))}
        />
      </div>
    </div>
  );
}

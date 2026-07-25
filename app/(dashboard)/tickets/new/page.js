import Link from "next/link";
import TicketForm from "@/components/tickets/TicketForm";

export default function NewTicketPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/tickets"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
        >
          ← Back to tickets
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink">Create Ticket</h1>
        <p className="mt-1 text-sm text-muted">
          Describe your issue and our team will get back to you.
        </p>
      </div>

      <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
        <TicketForm mode="create" />
      </div>
    </div>
  );
}

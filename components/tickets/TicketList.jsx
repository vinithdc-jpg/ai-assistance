"use client";

import Link from "next/link";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import { CATEGORY_LABELS } from "@/lib/constants";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TicketList({ tickets }) {
  if (!tickets.length) return null;

  return (
    <div className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="transition-colors hover:bg-surface/60">
                <td className="px-5 py-4">
                  <Link href={`/tickets/${ticket._id}`} className="group block">
                    <p className="font-medium text-ink group-hover:text-primary">
                      {ticket.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      #{ticket.ticketNumber}
                      {ticket.assignedAgent && (
                        <span> · {ticket.assignedAgent.name}</span>
                      )}
                    </p>
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <TicketStatusBadge status={ticket.status} />
                </td>
                <td className="px-5 py-4">
                  <TicketPriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-5 py-4 text-muted">
                  {CATEGORY_LABELS[ticket.category] ?? ticket.category}
                </td>
                <td className="px-5 py-4 text-muted">{formatDate(ticket.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

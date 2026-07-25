"use client";

import { useState } from "react";
import Link from "next/link";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import MessageThread from "./MessageThread";
import ActivityTimeline from "./ActivityTimeline";
import {
  TICKET_STATUS,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import ErrorAlert from "@/components/ui/ErrorAlert";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TicketDetail({
  ticket: initialTicket,
  messages: initialMessages,
  activities: initialActivities,
  userRole,
  agents = [],
}) {
  const [ticket, setTicket] = useState(initialTicket);
  const [activities, setActivities] = useState(initialActivities);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");

  const isStaff = userRole === "agent" || userRole === "admin";
  const isAdmin = userRole === "admin";

  async function refreshActivity() {
    const res = await fetch(`/api/tickets/${ticket._id}/activity`);
    const data = await res.json();
    if (data.success) setActivities(data.data);
  }

  async function updateField(field, value) {
    setError("");
    setUpdating(true);
    try {
      const res = await fetch(`/api/tickets/${ticket._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Update failed.");
        return;
      }
      setTicket(data.ticket);
      await refreshActivity();
    } catch {
      setError("Network error.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/tickets/${ticket._id}/attachments`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Upload failed.");
        return;
      }

      setTicket((prev) => ({
        ...prev,
        attachments: [...(prev.attachments ?? []), data.attachment],
      }));
      await refreshActivity();
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/tickets"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
          >
            ← Back to tickets
          </Link>
          <h1 className="font-display text-2xl font-bold text-ink">{ticket.title}</h1>
          <p className="mt-1 text-sm text-muted">
            #{ticket.ticketNumber} · Created {formatDate(ticket.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TicketStatusBadge status={ticket.status} />
          <TicketPriorityBadge priority={ticket.priority} />
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">
              Description
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
              {ticket.description}
            </p>
          </div>

          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
            <div className="mb-4 flex gap-4 border-b border-line">
              {["messages", "activity"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "messages" ? (
              <MessageThread
                ticketId={ticket._id}
                messages={initialMessages}
                userRole={userRole}
                isClosed={ticket.isClosed}
                onMessageSent={refreshActivity}
              />
            ) : (
              <ActivityTimeline activities={activities} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl2 border border-line bg-white p-5 shadow-card">
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-muted">
              Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="font-medium text-ink">
                  {CATEGORY_LABELS[ticket.category]}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Customer</dt>
                <dd className="font-medium text-ink">{ticket.customer?.name}</dd>
              </div>
              <div>
                <dt className="text-muted">Assigned agent</dt>
                <dd className="font-medium text-ink">
                  {ticket.assignedAgent?.name ?? "Unassigned"}
                </dd>
              </div>
              {ticket.tags?.length > 0 && (
                <div>
                  <dt className="text-muted">Tags</dt>
                  <dd className="mt-1 flex flex-wrap gap-1">
                    {ticket.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-2 py-0.5 text-xs text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {isStaff && (
            <div className="rounded-xl2 border border-line bg-white p-5 shadow-card">
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-muted">
                Manage
              </h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="status" className="mb-1 block text-xs text-muted">
                    Status
                  </label>
                  <select
                    id="status"
                    disabled={updating}
                    value={ticket.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    className="w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {Object.values(TICKET_STATUS).map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="mb-1 block text-xs text-muted">
                    Priority
                  </label>
                  <select
                    id="priority"
                    disabled={updating}
                    value={ticket.priority}
                    onChange={(e) => updateField("priority", e.target.value)}
                    className="w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {Object.entries(PRIORITY_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="agent" className="mb-1 block text-xs text-muted">
                    Assign to
                  </label>
                  <select
                    id="agent"
                    disabled={updating}
                    value={ticket.assignedAgent?._id ?? ""}
                    onChange={(e) =>
                      updateField("assignedAgent", e.target.value || null)
                    }
                    className="w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {agents.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl2 border border-line bg-white p-5 shadow-card">
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted">
              Attachments
            </h3>
            {ticket.attachments?.length > 0 ? (
              <ul className="mb-3 space-y-2">
                {ticket.attachments.map((att) => (
                  <li key={att.filename}>
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {att.originalName}
                    </a>
                    <span className="ml-2 text-xs text-muted">
                      ({Math.round(att.size / 1024)} KB)
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-3 text-sm text-muted">No attachments yet.</p>
            )}
            {!ticket.isClosed && (
              <label className="block">
                <span className="sr-only">Upload attachment</span>
                <input
                  type="file"
                  disabled={uploading}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  className="block w-full text-xs text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-primary-light file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary"
                />
              </label>
            )}
          </div>

          {isAdmin && (
            <Link
              href={`/tickets/${ticket._id}/edit`}
              className="block w-full rounded-xl border border-line bg-white py-2.5 text-center text-sm font-semibold text-ink hover:bg-surface"
            >
              Edit ticket
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

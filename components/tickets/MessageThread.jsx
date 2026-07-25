"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessageThread({
  ticketId,
  messages: initialMessages,
  userRole,
  isClosed,
  onMessageSent,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canPostInternal = userRole === "agent" || userRole === "admin";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, isInternal: canPostInternal && isInternal }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send message.");
        return;
      }

      setMessages((prev) => [...prev, data.message]);
      setContent("");
      setIsInternal(false);
      onMessageSent?.();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="max-h-[480px] space-y-4 overflow-y-auto px-1 py-2">
        {messages.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            No messages yet. Start the conversation below.
          </p>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderRole === userRole;
            const isNote = msg.isInternal;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    isNote
                      ? "border border-amber-200 bg-amber-50"
                      : isOwn
                        ? "bg-primary text-white"
                        : "border border-line bg-surface"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        isNote
                          ? "text-amber-700"
                          : isOwn
                            ? "text-white/90"
                            : "text-ink"
                      }`}
                    >
                      {msg.sender?.name ?? "Unknown"}
                      {isNote && " · Internal note"}
                    </span>
                    <span
                      className={`text-xs ${
                        isNote
                          ? "text-amber-600"
                          : isOwn
                            ? "text-white/70"
                            : "text-muted"
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <p
                    className={`whitespace-pre-wrap text-sm ${
                      isNote ? "text-amber-900" : isOwn ? "text-white" : "text-ink"
                    }`}
                  >
                    {msg.body}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!isClosed ? (
        <form onSubmit={handleSubmit} className="mt-4 border-t border-line pt-4">
          {error && (
            <div className="mb-3">
              <ErrorAlert message={error} />
            </div>
          )}

          {canPostInternal && (
            <label className="mb-2 flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-line text-primary focus:ring-primary"
              />
              Post as internal note (not visible to customer)
            </label>
          )}

          <div className="flex gap-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your reply..."
              rows={3}
              className="flex-1 resize-none rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="self-end rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-90"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-4 border-t border-line pt-4 text-center text-sm text-muted">
          This ticket is closed. Reopen it to send new messages.
        </p>
      )}
    </div>
  );
}

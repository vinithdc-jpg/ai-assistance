"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TICKET_CATEGORY,
  TICKET_PRIORITY,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
} from "@/lib/constants";
import ErrorAlert from "@/components/ui/ErrorAlert";

export default function TicketForm({ initialData = null, mode = "create" }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? TICKET_CATEGORY.GENERAL);
  const [priority, setPriority] = useState(initialData?.priority ?? TICKET_PRIORITY.MEDIUM);
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description,
      category,
      priority,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = mode === "create" ? "/api/tickets" : `/api/tickets/${initialData._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      router.push(`/tickets/${data.ticket._id}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <ErrorAlert message={error} />}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          minLength={5}
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of your issue"
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          required
          minLength={10}
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue in detail..."
          className="w-full resize-y rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
            Category
          </label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
          >
            {Object.values(TICKET_CATEGORY).map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="mb-1.5 block text-sm font-medium text-ink">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
          >
            {Object.values(TICKET_PRIORITY).map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="mb-1.5 block text-sm font-medium text-ink">
          Tags <span className="font-normal text-muted">(optional, comma-separated)</span>
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="billing, urgent, mobile"
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : mode === "create" ? "Create Ticket" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

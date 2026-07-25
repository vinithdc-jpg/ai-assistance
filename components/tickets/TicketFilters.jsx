"use client";

import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from "@/lib/constants";

export default function TicketFilters({
  filters,
  onChange,
  showAgentFilter = false,
  agents = [],
}) {
  function update(key, value) {
    onChange({ ...filters, [key]: value, page: 1 });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-muted">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Ticket #, title, description..."
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-xs font-medium text-muted">
          Status
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value="">All statuses</option>
          {Object.values(TICKET_STATUS).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priority" className="mb-1 block text-xs font-medium text-muted">
          Priority
        </label>
        <select
          id="priority"
          value={filters.priority}
          onChange={(e) => update("priority", e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value="">All priorities</option>
          {Object.values(TICKET_PRIORITY).map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-xs font-medium text-muted">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value="">All categories</option>
          {Object.values(TICKET_CATEGORY).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </div>

      {showAgentFilter && (
        <div>
          <label htmlFor="agent" className="mb-1 block text-xs font-medium text-muted">
            Assigned agent
          </label>
          <select
            id="agent"
            value={filters.assignedAgent}
            onChange={(e) => update("assignedAgent", e.target.value)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value="">All agents</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="sortBy" className="mb-1 block text-xs font-medium text-muted">
          Sort by
        </label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value="createdAt">Created date</option>
          <option value="updatedAt">Updated date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div>
        <label htmlFor="sortOrder" className="mb-1 block text-xs font-medium text-muted">
          Order
        </label>
        <select
          id="sortOrder"
          value={filters.sortOrder}
          onChange={(e) => update("sortOrder", e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
    </div>
  );
}

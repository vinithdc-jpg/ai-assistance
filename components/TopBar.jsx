"use client";

import { useState } from "react";

export default function TopBar() {
  const [query, setQuery] = useState("");

  return (
    <header className="flex h-16 flex-none items-center justify-between gap-4 border-b border-line bg-white px-6">
      <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4 flex-none text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="M17 17l-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conversations or tickets..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex flex-none items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4.5 w-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light font-display text-xs font-semibold text-primary">
            AR
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-ink">Alex Rivers</p>
            <p className="text-xs text-muted">Support Agent</p>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Conversations",
    icon: "M4 4h16v11H7l-3 3V4z",
  },
  {
    label: "Dashboard",
    icon: "M4 13h6V4H4zM14 20h6v-9h-6zM4 20h6v-4H4zM14 11h6V4h-6z",
  },
  {
    label: "Tickets",
    icon: "M4 7a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4z",
  },
  {
    label: "Analytics",
    icon: "M4 19V9m6 10V4m6 15v-7m6 7v-3",
  },
];

const HISTORY = [
  "Refund for order #4821",
  "Login issue — mobile app",
  "Upgrade to Professional plan",
  "API rate limit question",
];

export default function SideBar() {
  const [active, setActive] = useState("Conversations");
  const [query, setQuery] = useState("");

  const filteredHistory = HISTORY.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="flex h-screen w-64 flex-none flex-col border-r border-line bg-white">
      {/* Logo */}
      <div className="flex h-16 flex-none items-center gap-2 border-b border-line px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white">
          S
        </span>
        <span className="font-display text-lg font-bold text-ink">
          Supportly
        </span>
      </div>

      {/* New ticket */}
      <div className="flex-none px-4 pt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-raised transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M10 4v12M4 10h12" />
          </svg>
          New Ticket
        </button>
      </div>

      {/* Search history */}
      <div className="flex-none px-4 pt-4">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
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
            placeholder="Search history"
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>

        {query && (
          <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="w-full truncate rounded-md px-2 py-1.5 text-left text-xs text-muted hover:bg-surface hover:text-ink"
                    title={item}
                  >
                    {item}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-2 py-1.5 text-xs text-muted">No matches</li>
            )}
          </ul>
        )}
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item.label)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-muted hover:bg-surface hover:text-ink"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 flex-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Settings + account footer */}
      <div className="flex-none border-t border-line px-3 py-4">
        <button
          type="button"
          onClick={() => setActive("Settings")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            active === "Settings"
              ? "bg-primary-light text-primary"
              : "text-muted hover:bg-surface hover:text-ink"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          Settings
        </button>
      </div>
    </aside>
  );
}

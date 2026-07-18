const CONVERSATIONS = [
  {
    id: 1,
    name: "Elena Vance",
    initials: "EV",
    message: "I'm having trouble connecting my API key to the...",
    time: "2m ago",
    tags: [{ label: "Urgent", tone: "bg-red-50 text-red-600" }],
  },
  {
    id: 2,
    name: "Marcus Wright",
    initials: "MW",
    message: "Thank you for the quick resolution! I'd like to know...",
    time: "58m ago",
    tags: [{ label: "Technical Support", tone: "bg-sky-50 text-sky-600" }],
  },
];

export default function RecentConversations() {
  return (
    <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-ink">
          Recent Conversations
        </h2>
        <a href="#" className="text-xs font-semibold text-primary hover:underline">
          View All
        </a>
      </div>

      <ul className="mt-4 space-y-4">
        {CONVERSATIONS.map((c) => (
          <li key={c.id} className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-light font-display text-xs font-semibold text-primary">
              {c.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-ink">
                  {c.name}
                </p>
                <span className="flex-none text-xs text-muted">{c.time}</span>
              </div>
              <p className="mt-0.5 truncate text-sm text-muted">{c.message}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tag.tone}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}

        <li className="flex items-start gap-3 rounded-lg bg-primary-light/40 p-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-white">
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
              <rect x="4" y="7" width="16" height="12" rx="2" />
              <path d="M9 14h.01M15 14h.01M9 3v4M15 3v4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">AI Assistant</p>
              <span className="flex-none text-xs text-muted">Now</span>
            </div>
            <p className="mt-0.5 truncate text-sm font-medium text-primary">
              Drafting suggested response for Ticket #4582...
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

const STATS = [
  {
    label: "Open Tickets",
    value: "14",
    icon: "M4 7a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4z",
    tint: "bg-primary-light text-primary",
  },
  {
    label: "Avg Response",
    value: "28",
    suffix: "min",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    tint: "bg-sky-50 text-sky-600",
  },
  {
    label: "Resolved Today",
    value: "156",
    icon: "M5 13l4 4L19 7",
    tint: "bg-emerald-50 text-emerald-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-xl2 border border-line bg-white p-5 shadow-card"
        >
          <span
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-lg ${stat.tint}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={stat.icon} />
            </svg>
          </span>
          <div>
            <p className="font-display text-2xl font-bold text-ink">
              {stat.value}
              {stat.suffix && (
                <span className="ml-1 text-sm font-medium text-muted">
                  {stat.suffix}
                </span>
              )}
            </p>
            <p className="text-xs text-muted">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

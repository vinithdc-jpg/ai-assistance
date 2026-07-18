const METRICS = [
  { label: "Resolution Rate", value: 92 },
  { label: "AI Confidence Score", value: 88 },
  { label: "CSAT Score", value: 96 },
];

export default function InsightsBanner() {
  return (
    <div className="rounded-xl2 border border-line bg-gradient-to-br from-primary-light/60 to-white p-6 shadow-card sm:p-8">
      <span className="eyebrow">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.9L12 3z" />
        </svg>
        AI Weekly Insights
      </span>

      <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Your Response Speed is up 22%
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            The AI Suggested Reply feature has helped you resolve 45 more
            tickets last week. Maintaining this pace will qualify you for the
            monthly efficiency bonus.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#" className="btn-secondary">
              View Full Report
            </a>
            <a href="#" className="btn-primary">
              Optimize Workflow
            </a>
          </div>
        </div>

        <div className="rounded-xl2 border border-line bg-white p-5 shadow-card">
          <div className="space-y-4">
            {METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-xs font-medium text-ink">
                  <span>{metric.label}</span>
                  <span className="text-muted">{metric.value}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

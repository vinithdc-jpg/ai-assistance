const ACTIVITY = [
  {
    id: 1,
    title: "Ticket Reassigned",
    description: "Ticket #8602 moved from Renwick to Billing.",
    time: "12:14 PM",
    dot: "bg-sky-500",
  },
  {
    id: 2,
    title: "New Comment",
    description: "Sarah Chen added a private note to #5123.",
    time: "11:45 AM",
    dot: "bg-emerald-500",
  },
  {
    id: 3,
    title: "SLA Breach Warning",
    description: "Ticket #8931 is approaching its response deadline.",
    time: "10:30 AM",
    dot: "bg-amber-500",
  },
  {
    id: 4,
    title: "System Update",
    description: "AI knowledge base successfully updated to v2.4.",
    time: "9:00 AM",
    dot: "bg-gray-400",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
      <h2 className="font-display text-base font-semibold text-ink">
        Recent Activity
      </h2>

      <ul className="mt-4 space-y-5">
        {ACTIVITY.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span className={`mt-1.5 h-2 w-2 flex-none rounded-full ${item.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted">{item.description}</p>
              <p className="mt-1 text-[11px] text-muted">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { PRIORITY_LABELS } from "@/lib/constants";

const PRIORITY_STYLES = {
  low: "bg-slate-50 text-slate-600 border-slate-200",
  medium: "bg-sky-50 text-sky-700 border-sky-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  urgent: "bg-red-50 text-red-700 border-red-200",
};

export default function TicketPriorityBadge({ priority }) {
  const label = PRIORITY_LABELS[priority] ?? priority;
  const style = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.medium;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

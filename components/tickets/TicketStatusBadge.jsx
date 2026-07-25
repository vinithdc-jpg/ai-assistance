import { STATUS_LABELS } from "@/lib/constants";

const STATUS_STYLES = {
  open: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  waiting_on_customer: "bg-purple-50 text-purple-700 border-purple-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function TicketStatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? status;
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.open;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

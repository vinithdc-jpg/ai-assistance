"use client";

import { ACTIVITY_TYPE } from "@/lib/constants";

const ACTIVITY_ICONS = {
  [ACTIVITY_TYPE.CREATED]: "M12 4v16m8-8H4",
  [ACTIVITY_TYPE.STATUS_CHANGED]: "M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.5-2M20 15a9 9 0 01-15.5 2",
  [ACTIVITY_TYPE.PRIORITY_CHANGED]: "M12 19V5m-7 7h14",
  [ACTIVITY_TYPE.ASSIGNED]: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8z",
  [ACTIVITY_TYPE.REPLIED]: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  [ACTIVITY_TYPE.NOTE_ADDED]: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  [ACTIVITY_TYPE.ATTACHMENT_ADDED]: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48",
  [ACTIVITY_TYPE.CLOSED]: "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  [ACTIVITY_TYPE.REOPENED]: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15",
};

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ActivityTimeline({ activities }) {
  if (!activities?.length) {
    return (
      <p className="py-4 text-center text-sm text-muted">No activity recorded yet.</p>
    );
  }

  return (
    <ol className="space-y-4">
      {activities.map((item) => (
        <li key={item._id} className="flex gap-3">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-light">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={ACTIVITY_ICONS[item.type] ?? ACTIVITY_ICONS[ACTIVITY_TYPE.REPLIED]} />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-ink">{item.description}</p>
            <p className="mt-0.5 text-xs text-muted">
              {item.actor?.name ?? "System"} · {formatTime(item.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

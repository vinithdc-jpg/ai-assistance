"use client";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) return null;

  const { page, pages, total } = pagination;

  return (
    <div className="flex items-center justify-between border-t border-line pt-4">
      <p className="text-sm text-muted">
        Page {page} of {pages} · {total} total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      role="alert"
    >
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 flex-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v5M10 14h.01" />
      </svg>
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 font-semibold underline hover:no-underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

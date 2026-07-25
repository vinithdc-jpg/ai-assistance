export default function LoadingSpinner({ size = "md", label = "Loading..." }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8" role="status">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-line border-t-primary`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
      {size !== "sm" && (
        <p className="text-sm text-muted">{label}</p>
      )}
    </div>
  );
}

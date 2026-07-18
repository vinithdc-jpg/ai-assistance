export default function WelcomeHeader({ name = "Alex" }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        Good Morning, {name}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Here&apos;s a snapshot of your current ticket load for today.
      </p>
    </div>
  );
}

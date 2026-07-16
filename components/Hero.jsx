const STATS = [
  { value: "96%", label: "Customer satisfaction", live: false },
  { value: "60%", label: "Faster resolution time", live: false },
  { value: "24/7", label: "Always-on coverage", live: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-100 opacity-40 blur-3xl" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mx-auto">AI Customer Support</span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Transform Customer Support with{' '}
            <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
              AI-Powered Conversations
            </span>
            .
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
            Deploy a support agent that understands your product, resolves tickets instantly, and hands off to your team only when it truly matters.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#get-started" className="btn-primary w-full sm:w-auto">
              Start Free Trial
            </a>
            <a href="#demo" className="btn-secondary w-full sm:w-auto">
              Watch Demo
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-[1.75rem] border border-line bg-surface p-6 text-center shadow-card">
              <dt className="flex items-center justify-center gap-2 text-3xl font-bold text-ink">
                {stat.value}
                {stat.live && <span className="h-2 w-2 rounded-full bg-red-500" aria-label="Live" />}
              </dt>
              <dd className="mt-3 text-sm font-medium text-muted">{stat.label}</dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

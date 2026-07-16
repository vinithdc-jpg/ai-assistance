const STATS = [
  { value: "98%", label: "Customer satisfaction", live: false },
  { value: "60%", label: "Faster resolution time", live: false },
  { value: "24/7", label: "Always-on coverage", live: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pb-20 pt-20 sm:pt-28">
      <div className="container-page relative text-center">
        <span className="eyebrow mx-auto">AI Customer Support</span>

        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Transform Customer Support with{" "}
          <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            AI-Powered Conversations
          </span>
          .
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
          Deploy a support agent that understands your product, resolves tickets
          instantly, and hands off to your team only when it truly matters.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#get-started" className="btn-primary w-full sm:w-auto">
            Start Free Trial
          </a>
          <a href="#demo" className="btn-secondary w-full sm:w-auto">
            Watch Demo
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <dt className="flex items-center gap-1.5 font-display text-3xl font-bold text-ink">
                {stat.value}
                {stat.live && (
                  <span
                    className="h-2 w-2 rounded-full bg-red-500"
                    aria-label="Live"
                  />
                )}
              </dt>
              <dd className="text-xs text-muted sm:text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

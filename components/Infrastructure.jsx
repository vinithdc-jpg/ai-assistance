const MINI_FEATURES = [
  {
    title: "Seamless Setup",
    description: "Connect your help desk and knowledge base in minutes.",
    icon: "M4 4h16v4H4zM4 10h16v10H4z",
  },
  {
    title: "Ironclad Privacy",
    description: "Data stays encrypted in transit and at rest, always.",
    icon: "M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z",
  },
  {
    title: "Live Analytics",
    description: "Track resolution, sentiment, and volume in real time.",
    icon: "M4 19V9m6 10V4m6 15v-7",
  },
];

export default function Infrastructure() {
  return (
    <section id="product" className="bg-surface py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Infrastructure</span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            Enterprise-Grade Infrastructure
          </h2>
          <p className="mt-3 text-muted">
            Built on rails your security team will actually approve — global coverage, strict access controls, and a support desk that never clocks out.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-6">
            <div className="rounded-xl2 border border-line bg-white p-8 shadow-card">
              <h3 className="text-xl font-semibold text-ink">Secure Global Reach</h3>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Serve customers from data centers on every continent with sub-second latency and regional data residency.
              </p>

              <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-50 to-white">
                <div className="aspect-[16/9] w-full p-6">
                  <svg viewBox="0 0 400 200" className="h-full w-full" fill="none" aria-hidden="true">
                    <circle cx="60" cy="60" r="3.5" fill="#4338ca" />
                    <circle cx="120" cy="90" r="3.5" fill="#4338ca" />
                    <circle cx="200" cy="50" r="3.5" fill="#4338ca" />
                    <circle cx="260" cy="110" r="3.5" fill="#4338ca" />
                    <circle cx="330" cy="70" r="3.5" fill="#4338ca" />
                    <circle cx="180" cy="140" r="3.5" fill="#4338ca" />
                    <path
                      d="M60 60L200 50L330 70M120 90L200 50M200 50L180 140M260 110L200 50"
                      stroke="#4338ca"
                      strokeOpacity="0.45"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {MINI_FEATURES.map((feature) => (
                <div key={feature.title} className="rounded-xl2 border border-line bg-white p-6 shadow-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-ink">{feature.title}</h4>
                  <p className="mt-1 text-sm text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl2 bg-gradient-to-br from-primary to-indigo-500 p-8 text-white shadow-raised">
            <span className="eyebrow border-white/20 bg-white/10 text-white">Customer support</span>
            <h3 className="mt-5 text-2xl font-semibold">Create robust support experiences with confidence.</h3>
            <p className="mt-4 text-sm text-white/80">
              Every interaction is routed with guardrails, audit trails, and automatic escalation so your team can stay focused on the right issues.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/15 text-white">✓</span>
                <span>Compliance-ready controls and audits.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/15 text-white">✓</span>
                <span>Fast escalation with full conversation context.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/15 text-white">✓</span>
                <span>Enterprise-grade performance at global scale.</span>
              </li>
            </ul>

            <a href="#contact" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-slate-100">
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Enterprise-Grade Infrastructure
          </h2>
          <p className="mt-3 text-muted">
            Built on rails your security team will actually approve — global
            coverage, strict access controls, and a support desk that never
            clocks out.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="rounded-xl2 border border-line bg-white p-8 shadow-card lg:col-span-3">
            <h3 className="font-display text-xl font-semibold text-ink">
              Secure Global Reach
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Serve customers from data centers on every continent with
              sub-second latency and regional data residency.
            </p>
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-primary-light">
              <svg
                viewBox="0 0 400 200"
                className="h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="60" cy="60" r="2.5" fill="#5B4FE9" />
                <circle cx="120" cy="90" r="2.5" fill="#5B4FE9" />
                <circle cx="200" cy="50" r="2.5" fill="#5B4FE9" />
                <circle cx="260" cy="110" r="2.5" fill="#5B4FE9" />
                <circle cx="330" cy="70" r="2.5" fill="#5B4FE9" />
                <circle cx="180" cy="140" r="2.5" fill="#5B4FE9" />
                <path
                  d="M60 60 L200 50 L330 70 M120 90 L200 50 M200 50 L180 140 M260 110 L200 50"
                  stroke="#5B4FE9"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl2 bg-primary p-8 text-white shadow-raised lg:col-span-2">
            <div>
              <h3 className="font-display text-xl font-semibold">
                24/7 Rapid Support
              </h3>
              <p className="mt-2 text-sm text-white/80">
                A dedicated response team backs up the AI for the moments that
                need a human touch — day or night.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              Talk to Sales
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {MINI_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl2 border border-line bg-white p-6 shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={feature.icon} />
                </svg>
              </div>
              <h4 className="mt-4 font-display text-base font-semibold text-ink">
                {feature.title}
              </h4>
              <p className="mt-1 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Basic",
    price: "$0",
    period: "/mo",
    description: "For teams testing the waters.",
    features: [
      "Up to 100 conversations/mo",
      "Email support widget",
      "Standard response templates",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$199",
    period: "/mo",
    description: "For growing support teams.",
    features: [
      "Unlimited conversations",
      "Chat, email & help widget",
      "Custom knowledge base sync",
      "Priority escalation routing",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations at scale.",
    features: [
      "Dedicated success manager",
      "SSO & advanced permissions",
      "Custom SLAs & data residency",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 flex-none text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-9" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-surface py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mt-3 text-muted">
            No hidden fees, no per-seat surprises. Pick the plan that matches your ticket volume today.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl2 border p-8 ${
                plan.highlighted
                  ? "border-primary bg-white shadow-raised lg:-translate-y-3"
                  : "border-line bg-white shadow-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-ink">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#get-started"
                className={`mt-8 w-full text-center ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

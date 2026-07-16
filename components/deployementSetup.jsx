const STEPS = [
  {
    number: "01",
    title: "Connect your knowledge",
    description:
      "Import your help center, macros, and past tickets so the agent learns your voice.",
  },
  {
    number: "02",
    title: "Configure the guardrails",
    description:
      "Set escalation rules and approved actions so the agent knows exactly where its limits are.",
  },
  {
    number: "03",
    title: "Go live in one click",
    description:
      "Publish to chat, email, and your help widget, then watch resolutions roll in.",
  },
];

export default function DeploymentSteps() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Seamless Deployment Path
          </h2>
          <p className="mt-3 text-muted">
            Three steps stand between your current setup and an agent that
            actually resolves tickets.
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-line sm:block"
            aria-hidden="true"
          />
          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white font-display text-sm font-bold text-primary shadow-card">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

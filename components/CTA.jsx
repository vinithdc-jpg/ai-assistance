export default function CTA() {
  return (
    <section id="get-started" className="px-6 pb-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-r from-primary to-indigo-500 px-8 py-14 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 60%, white 0, transparent 30%)",
            }}
            aria-hidden="true"
          />
          <h2 className="relative text-2xl font-bold text-white sm:text-3xl">
            Ready to automate your support?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Join teams who cut response times without cutting corners on customer experience.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#demo"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

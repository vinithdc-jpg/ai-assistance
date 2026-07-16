const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API Reference", "Status", "Support"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white py-14">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              S
            </span>
            Supportly
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted">
            AI-powered conversations that resolve tickets and keep customers
            happy, around the clock.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {["X", "in", "gh"].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-xs font-semibold text-muted hover:border-primary hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h4 className="font-display text-sm font-semibold text-ink">
              {column.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted hover:text-ink">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Supportly, Inc. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
        </div>
      </div>
    </footer>
  );
}

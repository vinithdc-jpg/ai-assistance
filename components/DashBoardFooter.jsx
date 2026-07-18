const LINKS = ["Privacy Policy", "Terms of Service", "Contact Support", "Status"];

export default function DashboardFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-line px-1 py-4 text-xs text-muted sm:flex-row">
      <p>SupportAI &copy; {new Date().getFullYear()} SupportAI. All rights reserved.</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {LINKS.map((link) => (
          <a key={link} href="#" className="hover:text-ink">
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}

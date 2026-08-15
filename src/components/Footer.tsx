import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Gallery", href: "/#gallery" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Acknowledgement", href: "/acknowledgement" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 py-14 dark:border-dark-border dark:bg-dark-secondary/40">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <img
                src="/icons/logo.png"
                alt="Qawwam"
                className="h-8 w-auto"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft dark:text-dark-ink-soft">
              Every prayer. Every dua. In one app. A complete Islamic companion,
              thoughtfully designed for daily worship.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-bold tracking-widest text-ink-mute dark:text-dark-ink-mute">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-ink-soft transition hover:text-primary dark:text-dark-ink-soft dark:hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row dark:border-dark-border">
          <p className="text-sm text-ink-soft dark:text-dark-ink-soft">
            © {new Date().getFullYear()} Qawwam. All rights reserved.
          </p>
          <p className="text-xs text-ink-mute dark:text-dark-ink-mute">
            Made with <span className="text-primary">♥</span> for the ummah
          </p>
        </div>
      </div>
    </footer>
  );
}

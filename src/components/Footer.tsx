import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Gallery", href: "/#gallery" },
      { label: "Together", href: "/#connect" },
      { label: "Features", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Disclosures",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Acknowledgement", href: "/acknowledgement" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "support@qawwam.app", href: "mailto:support@qawwam.app" },
      { label: "Account Deletion", href: "/account-deletion" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 dark:border-dark-border dark:bg-dark-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-14">
          <div className="md:pr-8">
            <img
              src="/icons/logo.png"
              alt="Qawwam"
              className="h-7 w-auto dark:hidden"
            />
            <img
              src="/icons/logo-white.png"
              alt="Qawwam"
              className="hidden h-7 w-auto dark:block"
            />
            <p className="mt-6 max-w-xs text-sm leading-6 text-ink-soft dark:text-dark-ink-soft">
              Faith, together. A complete Islamic companion — prayer times,
              Qur'an, duas, tasbih and connected worship, thoughtfully designed
              for daily life.
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-mute dark:text-dark-ink-mute">
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-[13px] text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[13px] text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-[11px] uppercase tracking-[0.14em] text-ink-mute sm:flex-row sm:items-center sm:justify-between dark:border-dark-border dark:text-dark-ink-mute">
          <p>© {new Date().getFullYear()} Qawwam. All rights reserved.</p>
          <p>Made for the Ummah</p>
        </div>
      </div>
    </footer>
  );
}

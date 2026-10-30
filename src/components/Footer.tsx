import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { FOOTER_LINKS } from "../data/footer";
import { MadeWithLove } from "./FooterSection";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 dark:border-dark-border dark:bg-dark-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-14">
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
              Faith, Together. A complete Islamic companion — prayer times,
              Qur'an, duas, tasbih and connected worship, thoughtfully designed
              for daily life.
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[12px] font-medium text-ink-mute dark:text-dark-ink-mute">
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
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-16 flex flex-col items-center gap-3 text-center text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-dark-border dark:text-dark-ink-mute"
        >
          <p>© {new Date().getFullYear()} Qawwam. All rights reserved.</p>
          <MadeWithLove />
        </Reveal>
      </div>
    </footer>
  );
}

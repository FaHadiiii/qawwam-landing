import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { StoreBadges } from "./StoreBadges";
import { FOOTER_LINKS } from "../data/footer";

export function MadeWithLove() {
  return (
    <p className="flex items-center justify-center gap-1.5 font-caveat text-lg text-ink-soft sm:justify-end dark:text-dark-ink-soft">
      Made with
      <img src="/love.svg" alt="" className="h-4 w-auto" />
      for <span className="font-semibold">community</span>
    </p>
  );
}

export function FooterSection() {
  return (
    <section id="download" className="relative overflow-clip pt-20 sm:pt-32">
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-4xl px-5">
          <Reveal className="bg-paper px-5 py-8 shadow-[0_16px_50px_rgba(0,0,0,0.05)] sm:px-12 sm:py-16 dark:bg-dark-bg dark:shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
            <div className="text-center">
              <img
                src="/icons/logo.png"
                alt="Qawwam"
                className="mx-auto h-10 w-auto dark:hidden"
              />
              <img
                src="/icons/logo-white.png"
                alt="Qawwam"
                className="mx-auto hidden h-10 w-auto dark:block"
              />

              <h2 className="mt-8 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em]">
                Faith,{" "}
                <span className="text-ink-soft dark:text-dark-ink-soft">
                  Together.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft">
                Everything for daily worship — and the people who keep you
                close to it.
              </p>

              <div className="mt-8 flex justify-center">
                <StoreBadges />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-8">
              {FOOTER_LINKS.map((column, index) => (
                <nav
                  key={column.heading}
                  aria-label={column.heading}
                  className={`min-w-0 ${
                    index === 2 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <h3 className="text-[12px] font-medium text-ink-mute dark:text-dark-ink-mute">
                    {column.heading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("mailto:") ? (
                          <a
                            href={link.href}
                            className="block break-words text-[12px] sm:text-[13px] text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="block break-words text-[12px] sm:text-[13px] text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
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

            <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:text-left dark:text-dark-ink-mute">
              <p>© {new Date().getFullYear()} Qawwam. All rights reserved.</p>
              <MadeWithLove />
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[68%] -bottom-[10vh] z-0 overflow-hidden sm:top-1/2 sm:-bottom-[16vh]"
        >
          <img
            src="/footer.jpg"
            alt=""
            className="h-full w-full object-cover dark:brightness-[0.5] dark:saturate-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/75 to-paper/40 dark:from-dark-bg dark:via-dark-bg/90 dark:to-dark-bg/75" />
        </div>
      </div>

      <div className="h-[10vh] sm:h-[16vh]" />
    </section>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { useGallery } from "../lib/gallery-context";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#connect", label: "Together" },
  { label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
] as const;

const FEEDBACK_URL = "https://qawwam.userjot.com/";

function UserJotLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        className="fill-current"
        d="M5.89913 90.8654C8.0522 95.5121 10.6368 100.378 9.13098 105.618C8.06985 109.311 5.75106 112.334 5.42471 116.308C4.86915 123.072 10.8259 128.553 17.5205 127.438C23.7626 126.398 29.7626 120.467 36.339 122.014C36.9967 122.168 39.1761 122.939 44.4944 124.841C50.4386 126.967 56.7724 128 64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 73.5861 2.11243 82.6911 5.89913 90.8654Z"
      />
      <path
        className="stroke-paper dark:stroke-dark-bg"
        d="M86 82.6663C80.9833 89.3457 72.9962 93.6663 64 93.6663C55.0038 93.6663 47.0167 89.3457 42 82.6663"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openGallery } = useGallery();

  return (
    <header className="relative z-40 pt-8 sm:pt-12">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid h-16 max-w-4xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-20"
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="col-start-1 flex items-center justify-self-start"
          aria-label="Qawwam home"
        >
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
        </Link>

        <div className="col-start-2 hidden items-center gap-8 justify-self-center md:flex">
          {NAV_LINKS.map((link) =>
            "href" in link ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => openGallery()}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink"
              >
                {link.label}
              </button>
            ),
          )}
        </div>

        <div className="col-start-3 flex items-center justify-self-end">
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink md:flex dark:text-dark-ink-soft dark:hover:text-dark-ink"
          >
            <UserJotLogo className="h-4 w-4 text-ink dark:text-dark-ink" />
            Feedback
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden dark:text-dark-ink"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      {open && (
        <div className="border-y border-border bg-paper px-5 py-2 md:hidden dark:border-dark-border dark:bg-dark-bg">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) =>
              "href" in link ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-sm text-ink-soft dark:border-dark-border dark:text-dark-ink-soft"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openGallery();
                  }}
                  className="border-b border-border py-3.5 text-left text-sm text-ink-soft dark:border-dark-border dark:text-dark-ink-soft"
                >
                  {link.label}
                </button>
              ),
            )}
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-sm text-ink-soft dark:text-dark-ink-soft"
            >
              <UserJotLogo className="h-4 w-4 text-ink dark:text-dark-ink" />
              Feedback
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

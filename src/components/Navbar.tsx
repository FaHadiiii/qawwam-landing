import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../lib/theme-context'
import { Icon } from './Icon'

const NAV_LINKS = [
  { href: '#connect', label: 'Connect' },
  { href: '#features', label: 'Features' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

const EXTERNAL_LINK = { href: 'https://qawwam.userjot.com/', label: 'Feedback' }

function FeedbackIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
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
        className="stroke-white dark:stroke-black"
        d="M86 82.6663C80.9833 89.3457 72.9962 93.6663 64 93.6663C55.0038 93.6663 47.0167 89.3457 42 82.6663"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-border dark:bg-dark-bg/80 dark:border-dark-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4">
          <div className="col-start-1 flex items-center justify-self-start">
            <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
              <img src="/icons/logo.png" alt="Qawwam" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="col-start-2 hidden items-center justify-center gap-1 justify-self-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={EXTERNAL_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
            >
              <FeedbackIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{EXTERNAL_LINK.label}</span>
            </a>
          </div>

          <div className="col-start-3 flex items-center justify-end justify-self-end gap-2">
            <a
              href="#download"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(41,101,228,0.35)] transition hover:bg-primary/90 md:inline-flex"
            >
              Get the App
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center text-ink transition hover:text-primary md:hidden dark:text-dark-ink dark:hover:text-primary"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-surface px-5 py-4 md:hidden dark:border-dark-border dark:bg-dark-surface">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={EXTERNAL_LINK.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
              >
                <FeedbackIcon className="h-4 w-4 shrink-0" />
                <span>{EXTERNAL_LINK.label}</span>
              </a>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Floating theme toggle — bottom right corner */}
      <button
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:bg-secondary dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink dark:hover:bg-dark-secondary"
      >
        <Icon name={theme === 'dark' ? 'sunBright' : 'moonStar'} className="h-5 w-5" />
      </button>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../lib/theme-context'
import { Icon } from './Icon'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

const EXTERNAL_LINK = { href: 'https://qawwam.userjot.com/', label: 'Feedback' }

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-border dark:bg-dark-bg/80 dark:border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src="/icons/logo.png" alt="Qawwam" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
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
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
          >
            {EXTERNAL_LINK.label}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:bg-secondary dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink dark:hover:bg-dark-secondary"
          >
            <Icon name={theme === 'dark' ? 'sunBright' : 'moonStar'} className="h-[18px] w-[18px]" />
          </button>

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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink md:hidden dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
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
              className="rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition hover:bg-secondary hover:text-ink dark:text-dark-ink-soft dark:hover:bg-dark-secondary dark:hover:text-dark-ink"
            >
              {EXTERNAL_LINK.label}
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
  )
}

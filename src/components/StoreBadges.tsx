import { STORE_URLS } from '../data/site'

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.99-.23 1.93-.86 3.02-.77 1.3.1 2.29.62 2.94 1.55-2.7 1.64-2.06 5.26.42 6.27-.49 1.28-1.12 2.55-2.46 4.12ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M3.61 1.81 13.79 12 3.61 22.19c-.38-.31-.61-.78-.61-1.34V3.15c0-.56.23-1.03.61-1.34Zm12.4 11.82-2.4 2.4-8.35 6.53 10.75-8.93ZM22 12c0 .7-.37 1.31-.94 1.66l-2.3 1.28-2.44-2.44L18.76 9.9l2.3 1.28c.57.35.94.96.94 1.66v1.16ZM6.54 1.26l8.35 6.53 2.4 2.4L13.26 5.6l-6.72-4.34Z" />
    </svg>
  )
}

export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={STORE_URLS.appStore}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Qawwam on the App Store"
        className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:shadow-lg dark:border-dark-border dark:bg-dark-surface"
      >
        <AppleLogo />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Download on the
          </span>
          <span className="mt-1 text-base font-semibold">App Store</span>
        </span>
      </a>
      <a
        href={STORE_URLS.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Qawwam on Google Play"
        className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:shadow-lg dark:border-dark-border dark:bg-dark-surface"
      >
        <PlayLogo />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Get it on
          </span>
          <span className="mt-1 text-base font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  )
}

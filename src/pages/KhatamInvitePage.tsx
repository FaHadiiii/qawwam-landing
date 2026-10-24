import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { StoreBadges } from '../components/StoreBadges'

const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.qawwam.app'

/**
 * Browser fallback for https://qawwam.app/khatam/<token>.
 *
 * On Android the OS should open Qawwam before this page renders. If it does
 * not (link not verified, app not installed), this page can launch the app
 * explicitly and falls back to Google Play. iOS universal links are scaffolded
 * but will not verify until the Apple Developer capability is available.
 */
export function KhatamInvitePage() {
  const { token = '' } = useParams()
  const isAndroid =
    typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)

  const openApp = () => {
    if (!token) return
    const path = `/khatam/${encodeURIComponent(token)}`
    const fallback = encodeURIComponent(PLAY_URL)
    window.location.href =
      `intent://qawwam.app${path}#Intent;scheme=https;package=com.qawwam.app;` +
      `S.browser_fallback_url=${fallback};end`
  }

  return (
    <PageShell>
      <div className="flex min-h-[70vh] items-center justify-center px-5 pb-20 pt-28">
        <div className="w-full max-w-lg text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Khatam invite
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            You've been invited to read together
          </h1>
          <p className="mt-4 text-base leading-7 text-ink-soft dark:text-dark-ink-soft">
            Open this invitation in the Qawwam app to preview the journey and
            join.
          </p>

          {isAndroid ? (
            <button
              type="button"
              onClick={openApp}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(41,101,228,0.35)] transition hover:bg-primary/90 sm:w-auto"
            >
              Open in Qawwam
            </button>
          ) : (
            <p className="mt-8 rounded-2xl border border-border bg-surface px-5 py-4 text-sm text-ink-soft dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink-soft">
              Open this link on your Android phone. The iOS app is coming soon.
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>

          <p className="mt-6 text-xs text-ink-soft dark:text-dark-ink-soft">
            Keep this link private — anyone with it can request to join.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to qawwam.app
          </Link>
        </div>
      </div>
    </PageShell>
  )
}

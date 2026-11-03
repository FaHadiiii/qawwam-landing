import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { StoreBadges } from '../components/StoreBadges'
import { fetchInvitePreview, type KhatamPublicInvite } from '../lib/invite'

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.qawwam.app'
const SITE_TITLE = 'Qawwam — Faith, Together'

const BADGE =
  'text-[13px] font-medium text-ink-mute dark:text-dark-ink-mute'
const PRIMARY_BUTTON =
  'mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto'
const NOTE_CARD =
  'mt-4 bg-secondary/60 px-5 py-4 text-[13px] leading-6 text-ink-soft dark:bg-dark-secondary/60 dark:text-dark-ink-soft'
const FOOTNOTE = 'mt-6 text-[12px] text-ink-mute dark:text-dark-ink-mute'
const SKELETON = 'bg-secondary dark:bg-dark-secondary'
const HEADING =
  'mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em] text-ink dark:text-dark-ink'
const BODY = 'mt-4 text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft'

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; invite: KhatamPublicInvite }
  | { kind: 'invalid' }
  | { kind: 'error' }

const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date)
}

function stateNote(invite: KhatamPublicInvite): string | null {
  const owner = invite.owner.name?.trim() || 'the organiser'

  switch (invite.state) {
    case 'full':
      return `This journey is full (${invite.journey.maxMembers} readers).`
    case 'ended':
      return 'This journey has ended.'
    case 'completed':
      return 'This journey is complete.'
    case 'joinable':
      return invite.journey.effectiveJoinPolicy === 'linked_only'
        ? `You'll need to be connected to ${owner} in Qawwam to join.`
        : null
  }
}

function Loading() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className={`mx-auto h-5 w-28 ${SKELETON}`} />
      <div className={`mx-auto mt-6 h-9 w-72 ${SKELETON}`} />
      <div className={`mx-auto mt-3 h-8 w-56 ${SKELETON}`} />
      <div className={`mx-auto mt-5 h-4 w-64 ${SKELETON}`} />
      <div className={`mx-auto mt-8 h-12 w-full max-w-xs rounded-full ${SKELETON}`} />
    </div>
  )
}

function Ready({
  invite,
  isAndroid,
  onOpen,
}: {
  invite: KhatamPublicInvite
  isAndroid: boolean
  onOpen: () => void
}) {
  const { journey, owner } = invite
  const ownerName = owner.name?.trim() || null
  const note = stateNote(invite)
  const meta = [
    `${journey.memberCount} of ${journey.maxMembers} readers`,
    `Started ${formatDate(journey.startDate)}`,
    ...(journey.targetDate ? [`Target ${formatDate(journey.targetDate)}`] : []),
  ].join(' · ')

  return (
    <>
      <span className={BADGE}>Group Khatam</span>

      {owner.avatarUrl && (
        <img
          src={owner.avatarUrl}
          alt=""
          className="mx-auto mt-6 h-14 w-14 rounded-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      )}

      <h1 className={HEADING}>
        {ownerName
          ? `${ownerName} invited you to read`
          : "You've been invited to read together"}
      </h1>

      <p className="mt-3 break-words font-caveat text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] text-primary">
        “{journey.name}”
      </p>

      <p className="mt-4 text-[13px] leading-6 text-ink-soft dark:text-dark-ink-soft">
        {meta}
      </p>

      {note && <p className={NOTE_CARD}>{note}</p>}

      <p className={BODY}>
        Open this invitation in Qawwam to preview the journey and join.
      </p>

      {isAndroid && (
        <button type="button" onClick={onOpen} className={PRIMARY_BUTTON}>
          Open in Qawwam
        </button>
      )}

      <div className="mt-8 flex justify-center">
        <StoreBadges />
      </div>

      <p className={FOOTNOTE}>Keep this link private — anyone with it can request to join.</p>
      <Link to="/" className="mt-8 inline-block text-[13px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink">
        Back to qawwam.app
      </Link>
    </>
  )
}

function Invalid() {
  return (
    <>
      <span className={BADGE}>Group Khatam</span>
      <h1 className={HEADING}>This invite link is no longer valid</h1>
      <p className={BODY}>
        It may have been replaced by a newer link. Ask the organiser for a fresh one.
      </p>
      <div className="mt-8 flex justify-center">
        <StoreBadges />
      </div>
      <Link to="/" className="mt-8 inline-block text-[13px] font-medium text-ink-soft transition-colors hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink">
        Back to qawwam.app
      </Link>
    </>
  )
}

function Failed({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <span className={BADGE}>Group Khatam</span>
      <h1 className={HEADING}>We couldn't load this invitation</h1>
      <p className={BODY}>Check your connection and try again.</p>
      <button type="button" onClick={onRetry} className={PRIMARY_BUTTON}>
        Try again
      </button>
      <div className="mt-8 flex justify-center">
        <StoreBadges />
      </div>
    </>
  )
}

/**
 * Browser fallback for https://qawwam.app/khatam/<token>.
 *
 * On Android the OS should open Qawwam before this page renders. If it does
 * not (link not verified, app not installed), this page can launch the app
 * explicitly and falls back to Google Play. iOS universal links are scaffolded
 * but will not verify until the Apple Developer capability is available.
 *
 * The preview comes from the API's public `/khatam-invite/:token`, so no token
 * or session is needed here — and none must ever be baked into this bundle.
 */
export function KhatamInvitePage() {
  const { token = '' } = useParams()
  const [state, setState] = useState<LoadState>({ kind: 'loading' })
  const [attempt, setAttempt] = useState(0)

  const isAndroid =
    typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)

  const openApp = useCallback(() => {
    if (!token) return
    const path = `/khatam/${encodeURIComponent(token)}`
    const fallback = encodeURIComponent(PLAY_URL)
    window.location.href =
      `intent://qawwam.app${path}#Intent;scheme=https;package=com.qawwam.app;` +
      `S.browser_fallback_url=${fallback};end`
  }, [token])

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid' })
      return
    }

    const controller = new AbortController()
    setState({ kind: 'loading' })

    fetchInvitePreview(token, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return
        setState(
          result.kind === 'invalid'
            ? { kind: 'invalid' }
            : { kind: 'ready', invite: result.invite },
        )
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setState({ kind: 'error' })
      })

    return () => controller.abort()
  }, [token, attempt])

  useEffect(() => {
    if (state.kind === 'ready') {
      const owner = state.invite.owner.name?.trim()
      document.title = owner
        ? `${owner} invited you to read “${state.invite.journey.name}” — Qawwam`
        : `“${state.invite.journey.name}” — Qawwam`
    } else if (state.kind === 'invalid') {
      document.title = 'Invite link no longer valid — Qawwam'
    } else if (state.kind === 'error') {
      document.title = 'Invitation — Qawwam'
    }

    return () => {
      document.title = SITE_TITLE
    }
  }, [state])

  return (
    <PageShell>
      <div className="flex min-h-[70vh] items-center justify-center px-5 pb-20 pt-28">
        <div className="w-full max-w-lg text-center">
          {state.kind === 'loading' && <Loading />}
          {state.kind === 'ready' && (
            <Ready invite={state.invite} isAndroid={isAndroid} onOpen={openApp} />
          )}
          {state.kind === 'invalid' && <Invalid />}
          {state.kind === 'error' && <Failed onRetry={() => setAttempt((n) => n + 1)} />}
        </div>
      </div>
    </PageShell>
  )
}

/**
 * The invite preview the API exposes for link holders.
 *
 * Mirrors `qawwam-api/src/models/khatam-invite.model.ts`. The two repositories
 * are separate, so this type is duplicated on purpose; `docs/khatam-public-invite.md`
 * in the API repo is the contract.
 */
export type KhatamPublicInviteState = 'joinable' | 'full' | 'ended' | 'completed'

export type KhatamJoinPolicy = 'linked_only' | 'anyone_with_link'

export interface KhatamPublicInvite {
  state: KhatamPublicInviteState
  journey: {
    name: string
    startSurah: number
    startDate: string
    targetDate: string | null
    memberCount: number
    maxMembers: number
    effectiveJoinPolicy: KhatamJoinPolicy
    backgroundImageUrl: string | null
  }
  owner: {
    name: string | null
    avatarUrl: string | null
  }
}

export const API_BASE = (
  import.meta.env.VITE_API_BASE ?? 'https://qawwam-api-prod.hadiayo39.workers.dev'
).replace(/\/+$/, '')

/** Base64url from 32 random bytes is 43 characters. */
export const INVITE_TOKEN_RE = /^[A-Za-z0-9_-]{20,128}$/

export type InvitePreviewResult =
  | { kind: 'preview'; invite: KhatamPublicInvite }
  | { kind: 'invalid' }

/**
 * Read the public preview for a token.
 *
 * `invalid` is a 404 — the link was rotated or never existed, and the caller
 * should say so. Anything else (network, 5xx) throws, so the page can offer a
 * retry instead of telling the reader their invitation is gone.
 */
export async function fetchInvitePreview(
  token: string,
  signal?: AbortSignal,
): Promise<InvitePreviewResult> {
  if (!INVITE_TOKEN_RE.test(token)) return { kind: 'invalid' }

  const res = await fetch(`${API_BASE}/khatam-invite/${encodeURIComponent(token)}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (res.status === 404) return { kind: 'invalid' }
  if (!res.ok) throw new Error(`Invite preview failed with ${res.status}`)

  const body = (await res.json()) as { data?: KhatamPublicInvite }
  if (!body.data) throw new Error('Invite preview returned no data')

  return { kind: 'preview', invite: body.data }
}

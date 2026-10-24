/**
 * The Pages Functions' view of the API.
 *
 * Kept separate from `src/lib/invite.ts` on purpose: this runs on the server and
 * must never import anything that reads `import.meta.env`.
 */
export interface PublicInvite {
  state: 'joinable' | 'full' | 'ended' | 'completed'
  journey: {
    name: string
    startSurah: number
    startDate: string
    targetDate: string | null
    memberCount: number
    maxMembers: number
    effectiveJoinPolicy: 'linked_only' | 'anyone_with_link'
    backgroundImageUrl: string | null
  }
  owner: {
    name: string | null
    avatarUrl: string | null
  }
}

export interface Env {
  /** Overridable so local dev can point at http://localhost:8787. */
  API_BASE?: string
}

const DEFAULT_API_BASE = 'https://qawwam-api-prod.hadiayo39.workers.dev'
const TOKEN_RE = /^[A-Za-z0-9_-]{20,128}$/

export function apiBase(env: Env): string {
  return (env.API_BASE ?? DEFAULT_API_BASE).replace(/\/+$/, '')
}

/**
 * `null` for every failure — an expired token, a network error, a 5xx. The
 * callers fall back to the generic card rather than inventing a broken one.
 */
export async function fetchInvite(env: Env, token: string): Promise<PublicInvite | null> {
  if (!TOKEN_RE.test(token)) return null

  try {
    const res = await fetch(`${apiBase(env)}/khatam-invite/${encodeURIComponent(token)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null

    const body = (await res.json()) as { data?: PublicInvite }
    return body.data ?? null
  } catch {
    return null
  }
}

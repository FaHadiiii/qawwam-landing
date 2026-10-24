import { apiBase, fetchInvite, type Env } from '../../_lib/api'
import { renderInviteImage, type BackgroundImage } from '../../_lib/og-image'

/**
 * Only the two hosts the API is allowed to return, checked again here — the
 * renderer must never be pointed at an arbitrary address by a journey owner.
 */
async function loadBackground(url: string, apiOrigin: string): Promise<BackgroundImage | null> {
  try {
    const parsed = new URL(url)
    const allowed =
      parsed.hostname === 'images.pexels.com' ||
      (parsed.origin === apiOrigin && parsed.pathname.startsWith('/khatam-backgrounds/'))
    if (!allowed) return null

    const res = await fetch(parsed, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return null

    const contentType = (res.headers.get('content-type') ?? '').split(';')[0].trim()
    if (!contentType.startsWith('image/')) return null

    const data = await res.arrayBuffer()
    if (data.byteLength > 4 * 1024 * 1024) return null

    return { data, contentType }
  } catch {
    return null
  }
}

/** `/khatam/:token/og` — the 1200×630 share card. */
export const onRequest: PagesFunction<Env> = async (context) => {
  const raw = context.params.token
  const token = typeof raw === 'string' ? raw : ''

  const invite = await fetchInvite(context.env, token)
  if (!invite) {
    return Response.redirect(new URL('/feature.png', context.request.url).toString(), 302)
  }

  const background = invite.journey.backgroundImageUrl
    ? await loadBackground(
        invite.journey.backgroundImageUrl,
        new URL(apiBase(context.env)).origin,
      )
    : null

  return renderInviteImage(invite, background, context)
}

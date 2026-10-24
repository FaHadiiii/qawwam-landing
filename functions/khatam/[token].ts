import { fetchInvite, type Env } from '../_lib/api'
import { isCrawler } from '../_lib/bot'
import { buildMetaBlock, META_BLOCK_RE } from '../_lib/html'

/**
 * `/khatam/:token` — the static SPA for readers, per-invite metadata for crawlers.
 *
 * The asset response is passed through untouched for humans, so the page still
 * boots from the CDN. A crawler never runs the SPA, so it gets the same HTML with
 * the `<!-- meta:start -->` block rewritten.
 *
 * `X-Robots-Tag: noindex` is set on both: invite pages must not enter search
 * results. robots.txt is not enough — a disallowed page can still be indexed
 * without a snippet.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, params, env, next } = context
  const raw = params.token
  const token = typeof raw === 'string' ? raw : ''

  const asset = await next()
  const headers = new Headers(asset.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')

  const passThrough = () =>
    new Response(asset.body, {
      status: asset.status,
      statusText: asset.statusText,
      headers,
    })

  if (!token || !isCrawler(request.headers.get('user-agent'))) {
    return passThrough()
  }

  const invite = await fetchInvite(env, token)
  if (!invite) {
    // An expired link still gets the generic site card rather than a broken one.
    return passThrough()
  }

  const html = await asset.text()
  if (!META_BLOCK_RE.test(html)) {
    return new Response(html, { status: asset.status, headers })
  }

  const meta = buildMetaBlock(invite, token, new URL(request.url).origin)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')

  return new Response(html.replace(META_BLOCK_RE, () => meta), {
    status: asset.status,
    headers,
  })
}

import type { PublicInvite } from './api'

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Journey and owner names are user input and land inside HTML attributes. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char)
}

/** Control characters are not renderable in a card and can split a meta tag. */
function stripControlCharacters(value: string): string {
  let out = ''
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0
    out += code < 0x20 || code === 0x7f ? ' ' : char
  }
  return out
}

/** Strip control characters and clamp to a length a card can actually show. */
export function cleanText(value: string, max: number): string {
  const cleaned = stripControlCharacters(value).replace(/\s+/g, ' ').trim()
  return cleaned.length <= max ? cleaned : `${cleaned.slice(0, max - 1).trimEnd()}…`
}

const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date)
}

function stateNote(invite: PublicInvite): string | null {
  switch (invite.state) {
    case 'full':
      return 'Journey full'
    case 'ended':
      return 'Journey ended'
    case 'completed':
      return 'Journey complete'
    case 'joinable':
      return invite.journey.effectiveJoinPolicy === 'linked_only'
        ? 'Connected accounts only'
        : null
  }
}

export const META_BLOCK_RE = /<!-- meta:start -->[\s\S]*?<!-- meta:end -->/

/**
 * The whole `<head>` metadata block, rebuilt for one invite.
 *
 * Everything interpolated here is escaped: an owner controls the journey and
 * profile names, and this string is served from qawwam.app.
 */
export function buildMetaBlock(invite: PublicInvite, token: string, origin: string): string {
  const owner = invite.owner.name ? cleanText(invite.owner.name, 40) : null
  const journey = cleanText(invite.journey.name, 80)

  const title = owner
    ? `${owner} invited you to read “${journey}”`
    : `You're invited to read “${journey}”`

  const description = [
    `${invite.journey.memberCount} of ${invite.journey.maxMembers} readers`,
    `Started ${formatDate(invite.journey.startDate)}`,
    stateNote(invite),
  ]
    .filter((part): part is string => part !== null)
    .join(' · ')

  const url = `${origin}/khatam/${token}`
  const image = `${url}/og`

  const meta = [
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'Qawwam'],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:locale', 'en_MY'],
    ['property', 'og:image', image],
    ['property', 'og:image:secure_url', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', title],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
  ]
    .map(
      ([attribute, key, content]) =>
        `    <meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
    )
    .join('\n')

  return [
    '<!-- meta:start -->',
    `    <title>${escapeHtml(title)} — Qawwam</title>`,
    `    <meta name="description" content="${escapeHtml(description)}" />`,
    '    <meta name="robots" content="noindex, nofollow" />',
    `    <link rel="canonical" href="${escapeHtml(url)}" />`,
    '',
    '    <!-- Open Graph / Twitter -->',
    meta,
    '    <!-- meta:end -->',
  ].join('\n')
}

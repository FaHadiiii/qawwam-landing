import { createElement as h } from 'react'
import { CustomFont, ImageResponse, cache } from '@cf-wasm/og/workerd'
import type { PublicInvite } from './api'
import { cleanText } from './html'
import boldFont from '../_fonts/AlbertSans-Bold.ttf.bin'
import regularFont from '../_fonts/AlbertSans-Regular.ttf.bin'

export interface BackgroundImage {
  data: ArrayBuffer
  contentType: string
}

// Module scope on purpose: the wasm/font instances are reused across requests
// in the same isolate. CustomFont caches its own data promise.
const FONTS = [
  new CustomFont('Albert Sans', regularFont, { weight: 400 }),
  new CustomFont('Albert Sans', boldFont, { weight: 700 }),
]

const BRAND_GRADIENT = 'linear-gradient(135deg, #20335F 0%, #2965E4 100%)'
const SHADE =
  'linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.62) 35%, rgba(15,15,15,0.88) 68%, rgba(15,15,15,0.97) 100%)'
// The copy sits bottom-left, so the photo stays visible over the right half.
const LEFT_SCRIM =
  'linear-gradient(90deg, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.82) 38%, rgba(15,15,15,0.35) 66%, rgba(15,15,15,0) 88%)'

/**
 * The bundled satori fork crashes in glyph lookup on any character Albert Sans
 * does not cover, and adding a second font does not fix it. A share card that
 * 500s is worse than one without the name, so non-Latin names are replaced with
 * a Latin label; the og:title / og:description still carry the real name.
 */
const NON_LATIN_RE = /[^\u0020-\u024F\u2000-\u206F\u20A0-\u20CF]/

function isDrawable(value: string): boolean {
  return !NON_LATIN_RE.test(value)
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

/**
 * The share card: the journey's own background, dimmed, with the names on it.
 *
 * Everything drawn here is user input. It is clamped by `cleanText`; there is no
 * HTML here to escape, but the same names do reach `buildMetaBlock`, which escapes.
 */
export async function renderInviteImage(
  invite: PublicInvite,
  background: BackgroundImage | null,
  executionContext: { waitUntil(promise: Promise<unknown>): void },
): Promise<Response> {
  cache.setExecutionContext(executionContext)

  const journey = cleanText(invite.journey.name, 80)
  const journeyLabel = isDrawable(journey) ? journey : `Juz ${invite.journey.startSurah}`

  const owner = invite.owner.name ? cleanText(invite.owner.name, 40) : null
  const ownerLabel = owner !== null && isDrawable(owner) ? owner : null

  const backgroundSrc = background
    ? `data:${background.contentType};base64,${toBase64(background.data)}`
    : null

  const element = h(
    'div',
    {
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '1200px',
        height: '630px',
        padding: '64px 72px',
        color: '#FFFFFF',
        fontFamily: 'Albert Sans',
        backgroundColor: '#0F0F0F',
        ...(backgroundSrc ? {} : { backgroundImage: BRAND_GRADIENT }),
      },
    },
    backgroundSrc
      ? h('img', {
          src: backgroundSrc,
          width: 1200,
          height: 630,
          style: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '1200px',
            height: '630px',
            objectFit: 'cover',
          },
        })
      : null,
    h('div', {
      style: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '1200px',
        height: '630px',
        backgroundImage: SHADE,
      },
    }),
    backgroundSrc
      ? h('div', {
          style: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '1200px',
            height: '630px',
            backgroundImage: LEFT_SCRIM,
          },
        })
      : null,
    h(
      'div',
      {
        style: {
          display: 'flex',
          position: 'relative',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#9DBBFF',
        },
      },
      'Khatam invite',
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          position: 'relative',
          marginTop: '18px',
          fontSize: journeyLabel.length > 34 ? '54px' : '72px',
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: '1020px',
        },
      },
      journeyLabel,
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          position: 'relative',
          marginTop: '22px',
          fontSize: '30px',
          color: '#EDEDED',
        },
      },
      ownerLabel
        ? `${ownerLabel} invited you to read together`
        : 'You are invited to read together',
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          position: 'relative',
          marginTop: '14px',
          fontSize: '24px',
          color: '#B4B4B4',
        },
      },
      `${invite.journey.memberCount} of ${invite.journey.maxMembers} readers · qawwam.app`,
    ),
  )

  const image = await ImageResponse.async(element, {
    width: 1200,
    height: 630,
    fonts: FONTS,
  })

  return new Response(image.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  })
}

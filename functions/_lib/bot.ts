/**
 * Link-preview fetchers. These are the clients that must see per-invite tags;
 * a normal browser gets the SPA and reads the same data from `src/lib/invite.ts`.
 */
const CRAWLER_RE =
  /facebookexternalhit|facebookcatalog|WhatsApp|Twitterbot|TelegramBot|Slackbot|Discordbot|LinkedInBot|Pinterest|Googlebot|bingbot|Applebot|redditbot|embedly|Iframely|Mastodon|SkypeUriPreview|vkShare/i

export function isCrawler(userAgent: string | null): boolean {
  return userAgent !== null && CRAWLER_RE.test(userAgent)
}

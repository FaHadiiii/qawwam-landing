# Qawwam Landing Page

Marketing landing page for the **Qawwam** Islamic app, built as preparation for store release. Mirrors the app's design system (AlbertSans, brand blue `#2965E4`, rounded cards, dark/light themes).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- React Router (SPA routes) + react-markdown (disclosure docs)
- Deploys to **Cloudflare Pages**

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run build      # type-check + production build → dist/
npm run lint       # oxlint
npm run preview    # preview the production build
npm run deploy     # build + deploy to Cloudflare Pages (project: qawwam-landing)
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing (Hero, Features, Quran, Demos, Stats, Reviews, FAQ, Download) |
| `/terms` | Terms of Use |
| `/privacy` | Privacy Policy |
| `/acknowledgement` | Acknowledgement |

## Disclosure content

The Terms of Use, Privacy Policy and Acknowledgement markdown in `src/content/` are **copied** from
`qawwam-api/src/services/disclosure.service.ts` (the app's backend, which serves them to the app at
`/v1/disclosures/{slug}`).

They are embedded statically (not fetched) because that endpoint requires a Bearer token and the
landing page has no server-side component.

**Keep in sync:** if the disclosure text changes in `qawwam-api`, re-copy the markdown into
`src/content/` and update the version/date in the page components.

## Store links

`src/data/site.ts` contains placeholder App Store / Google Play URLs — replace them with the real
URLs before release.

## Brand assets

Copied from the Flutter app:

- `public/icons/app-icon.png` · `logo.png` · `logo-white.png` · `kaabah.png`
- `public/fonts/` — AlbertSans (weights 100–900)

## Deployment

```bash
npm run deploy
```

Cloudflare Pages serves `dist/`; `public/_redirects` provides the SPA fallback so client-side
routes (`/terms`, `/privacy`, …) work on refresh.

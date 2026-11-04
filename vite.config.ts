import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The Vite dev server has no Pages Functions, so proxy the prayer API here and
 * add the bearer token that only the server side may hold. `npm run dev:pages`
 * exercises the real Pages Functions instead.
 */
function devApiToken(): string | undefined {
  if (process.env.API_TOKEN) return process.env.API_TOKEN
  try {
    const file = readFileSync(resolve(process.cwd(), '.dev.vars'), 'utf8')
    const line = file
      .split(/\r?\n/)
      .find((entry) => entry.startsWith('API_TOKEN='))
    return line?.slice('API_TOKEN='.length).trim() || undefined
  } catch {
    return undefined
  }
}

const prayerApiBase =
  process.env.PRAYER_API_BASE ??
  'https://qawwam-api.hadiayo39.workers.dev'
const inviteApiBase =
  process.env.API_BASE ?? 'https://qawwam-api-prod.hadiayo39.workers.dev'
const token = devApiToken()

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // The invite page is same-origin in production, so mirror that here:
      // Functions/api/khatam-invite/[token].ts does this behind Pages.
      '/api/khatam-invite': {
        target: inviteApiBase,
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/khatam-invite/, '/khatam-invite'),
      },
      ...(token && {
        '/api/prayer': {
          target: prayerApiBase,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/prayer/, '/prayer'),
          headers: { Authorization: `Bearer ${token}` },
        },
      }),
    },
  },
})

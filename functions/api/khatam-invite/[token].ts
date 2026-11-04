import { apiBase, type Env } from "../../_lib/api";

/** Base64url from 32 random bytes is 43 characters. Mirrors `src/lib/invite.ts`. */
const TOKEN_RE = /^[A-Za-z0-9_-]{20,128}$/;

const NOT_FOUND = () =>
  new Response(
    JSON.stringify({
      status: "error",
      code: "NOT_FOUND",
      message: "Invite not found",
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );

/**
 * Same-origin proxy for the public invite preview.
 *
 * The page must not call the API cross-origin: the site's CSP keeps
 * `connect-src 'self'`, and a cross-origin fetch is refused before it leaves the
 * browser. Forwarding here also keeps the API host out of the bundle, so the
 * browser page and the crawler cards are always served by the same API — the
 * Functions' `API_BASE` binding is the only place the origin is configured.
 *
 * The upstream status is passed through unchanged: the page tells a 404 ("this
 * link is gone") from everything else ("try again").
 */
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const token = String(params.token ?? "");
  if (!TOKEN_RE.test(token)) return NOT_FOUND();

  try {
    const response = await fetch(
      `${apiBase(env)}/khatam-invite/${encodeURIComponent(token)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
      },
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": response.ok
          ? "public, max-age=60, stale-while-revalidate=300"
          : "no-store",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UPSTREAM_ERROR",
        message: "Invite API unavailable",
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  }
};

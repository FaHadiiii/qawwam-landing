import { apiBase, type Env } from "./api";

export interface PrayerEnv extends Env {
  API_TOKEN?: string;
  PRAYER_RATE_LIMITER?: RateLimit;
}

type PrayerContext = Parameters<PagesFunction<PrayerEnv>>[0];

/**
 * Proxy the protected /prayer/* API for the public landing page.
 *
 * The browser cannot hold the API bearer token, so the Pages Function adds it
 * server-side and forwards only the response body. The prayer datasets are
 * static per month, so callers provide a cache lifetime.
 */
export async function forwardPrayer(
  context: PrayerContext,
  path: string,
  cacheSeconds: number,
): Promise<Response> {
  const rateLimiter = context.env.PRAYER_RATE_LIMITER;
  if (rateLimiter) {
    const clientKey =
      context.request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await rateLimiter.limit({ key: clientKey });
    if (!success) {
      return new Response(
        JSON.stringify({
          status: "error",
          code: "RATE_LIMITED",
          message: "Too many requests",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Retry-After": "60",
          },
        },
      );
    }
  }

  const token = context.env.API_TOKEN;
  if (!token) {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "CONFIG_ERROR",
        message: "Prayer API token is not configured",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const requestUrl = new URL(context.request.url);
  const target = new URL(`${apiBase(context.env)}/prayer/${path}`);
  requestUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  try {
    const response = await fetch(target, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(8000),
    });

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers.get("Content-Type") ?? "application/json",
    );
    headers.set(
      "Cache-Control",
      response.ok ? `public, max-age=${cacheSeconds}` : "no-store",
    );

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UPSTREAM_ERROR",
        message: "Prayer API unavailable",
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

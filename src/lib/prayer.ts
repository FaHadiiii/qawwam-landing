export interface PrayerCountry {
  iso: string;
  name: string;
  methodName: string;
  flagUrl: string;
  logoUrl: string;
}

export interface PrayerZone {
  code: string;
  zone: string;
  state: string;
}

export interface PrayerTimings {
  imsak: string | null;
  fajr: string;
  syuruk: string;
  dhuha: string | null;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerDay {
  date: string;
  hijri: string;
  timings: PrayerTimings;
}

export interface PrayerMonth {
  available: boolean;
  period: string;
  year: number;
  month?: number;
  zone: string | null;
  state: string | null;
  method: string;
  days: PrayerDay[];
}

export interface LocalNow {
  date: string;
  month: string;
  seconds: number;
}

type ApiEnvelope<T> =
  | { status: "success"; data: T }
  | { status: "error"; code: string; message: string };

async function getData<T>(
  path: string,
  params: Record<string, string | number>,
  signal?: AbortSignal,
): Promise<T> {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();
  const response = await fetch(
    `/api/prayer/${path}${query ? `?${query}` : ""}`,
    {
      headers: { Accept: "application/json" },
      signal,
    },
  );

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !body || body.status !== "success") {
    throw new Error(
      body?.status === "error"
        ? body.message
        : `Prayer request failed with ${response.status}`,
    );
  }

  return body.data;
}

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());

/** GET /api/prayer/countries */
export function fetchPrayerCountries(
  signal?: AbortSignal,
): Promise<PrayerCountry[]> {
  return getData<PrayerCountry[]>("countries", {}, signal);
}

/** GET /api/prayer/zones?iso=…, flattened from the API's state groups. */
export async function fetchPrayerZones(
  iso: string,
  signal?: AbortSignal,
): Promise<PrayerZone[]> {
  const data = await getData<{
    country: string;
    zones: Record<string, { code: string; zone: string }[]>;
  }>("zones", { iso }, signal);

  return Object.entries(data.zones)
    .flatMap(([state, zones]) =>
      zones.map((zone) => ({
        code: zone.code,
        zone: zone.zone,
        state: titleCase(state),
      })),
    )
    .sort(
      (a, b) =>
        a.state.localeCompare(b.state) || a.code.localeCompare(b.code),
    );
}

/** GET /api/prayer/times for one zone and month (YYYY-MM). */
export function fetchPrayerMonth(
  country: string,
  zone: string,
  period: string,
  signal?: AbortSignal,
): Promise<PrayerMonth> {
  return getData<PrayerMonth>("times", { country, zone, period }, signal);
}

/**
 * The local date, month and seconds since midnight.
 *
 * The API timings are local to the selected zone, and the card is for a user
 * who picks their own zone, so the device clock is the right reference.
 */
export function getLocalNow(date = new Date()): LocalNow {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    date: `${date.getFullYear()}-${month}-${day}`,
    month: `${date.getFullYear()}-${month}`,
    seconds:
      date.getHours() * 3600 +
      date.getMinutes() * 60 +
      date.getSeconds(),
  };
}

/** Add whole days to a YYYY-MM-DD date string. */
export function addDays(date: string, days: number): string {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

/** Parse the API's HH:mm timing into minutes since midnight. */
export function parsePrayerTime(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})/.exec(value.trim());
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;

  return hours * 60 + minutes;
}

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import {
  addDays,
  fetchPrayerCountries,
  fetchPrayerMonth,
  fetchPrayerZones,
  getLocalNow,
  parsePrayerTime,
  type PrayerCountry,
  type PrayerMonth,
  type PrayerZone,
} from "../lib/prayer";

type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
type GlyphName = "subuh" | "asar" | "maghrib" | "isyak";

const PRAYERS: {
  key: PrayerKey;
  label: string;
  glyph: GlyphName;
  mirrored?: boolean;
}[] = [
  { key: "fajr", label: "Fajr", glyph: "subuh" },
  { key: "dhuhr", label: "Dhuhr", glyph: "asar" },
  { key: "asr", label: "Asr", glyph: "asar", mirrored: true },
  { key: "maghrib", label: "Maghrib", glyph: "maghrib" },
  { key: "isha", label: "Isha", glyph: "isyak" },
];

const FALLBACK_COUNTRIES: PrayerCountry[] = [
  {
    iso: "MY",
    name: "Malaysia",
    methodName: "JAKIM",
    flagUrl: "https://flagcdn.com/w80/my.png",
    logoUrl: "https://qawwam-api.hadiayo39.workers.dev/logos/MY.png",
  },
  {
    iso: "ID",
    name: "Indonesia",
    methodName: "KEMENAG",
    flagUrl: "https://flagcdn.com/w80/id.png",
    logoUrl: "https://qawwam-api.hadiayo39.workers.dev/logos/ID.png",
  },
  {
    iso: "SG",
    name: "Singapore",
    methodName: "MUIS",
    flagUrl: "https://flagcdn.com/w80/sg.png",
    logoUrl: "https://qawwam-api.hadiayo39.workers.dev/logos/SG.png",
  },
  {
    iso: "BN",
    name: "Brunei",
    methodName: "KHEU",
    flagUrl: "https://flagcdn.com/w80/bn.png",
    logoUrl: "https://qawwam-api.hadiayo39.workers.dev/logos/BN.png",
  },
];

const FALLBACK_ZONES: PrayerZone[] = [
  { code: "WLY01", zone: "Kuala Lumpur", state: "Kuala Lumpur" },
  { code: "SGR01", zone: "Petaling", state: "Selangor" },
  { code: "JHR01", zone: "Johor Bahru", state: "Johor" },
];

const DEFAULT_COUNTRY = "MY";
const DEFAULT_ZONE = "WLY01";
const OPAQUE_ZONE = /^[0-9a-f]{32}$/;
const ARC_PATH = "M 12 82 C 82 12 218 12 288 82";

const pad = (value: number) => value.toString().padStart(2, "0");

const isOpaqueZone = (code: string) => OPAQUE_ZONE.test(code);

const flagEmoji = (iso: string) =>
  iso
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    );

function formatClock(minutes: number) {
  const hour24 = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  const hour = hour24 % 12 || 12;
  return `${hour}:${pad(minute)} ${hour24 >= 12 ? "PM" : "AM"}`;
}

type ScheduledPrayer = {
  key: PrayerKey;
  label: string;
  glyph: GlyphName;
  mirrored?: boolean;
  /** Minutes since midnight, possibly shifted by ±24h for the interval math. */
  minutes: number;
  /** The clock time to display, always within the day. */
  displayMinutes: number;
};

type Schedule = {
  current: ScheduledPrayer;
  next: ScheduledPrayer;
  remaining: number;
  progress: number;
};

function getSchedule(
  month: PrayerMonth | null,
  date: string,
  nowSeconds: number,
): Schedule | null {
  if (!month?.available) return null;

  const today = month.days.find((day) => day.date === date);
  if (!today) return null;

  const scheduled = PRAYERS.map((prayer) => {
    const minutes = parsePrayerTime(today.timings[prayer.key]);
    return minutes == null
      ? null
      : {
          ...prayer,
          minutes,
          displayMinutes: minutes,
        };
  });

  if (scheduled.some((prayer) => prayer == null)) return null;
  const times = scheduled as ScheduledPrayer[];

  const nextIndex = times.findIndex(
    (prayer) => prayer.minutes * 60 > nowSeconds,
  );

  let current: ScheduledPrayer;
  let next: ScheduledPrayer;

  if (nextIndex === -1) {
    const tomorrow = month.days.find(
      (day) => day.date === addDays(date, 1),
    );
    const tomorrowFajr =
      parsePrayerTime(tomorrow?.timings.fajr ?? today.timings.fajr) ??
      times[0].minutes;

    current = { ...times[4] };
    next = {
      ...times[0],
      minutes: tomorrowFajr + 24 * 60,
      displayMinutes: tomorrowFajr,
    };
  } else if (nextIndex === 0) {
    const yesterday = month.days.find(
      (day) => day.date === addDays(date, -1),
    );
    const yesterdayIsha =
      parsePrayerTime(yesterday?.timings.isha ?? today.timings.isha) ??
      times[4].minutes;

    current = {
      ...times[4],
      minutes: yesterdayIsha - 24 * 60,
      displayMinutes: yesterdayIsha,
    };
    next = { ...times[0] };
  } else {
    current = { ...times[nextIndex - 1] };
    next = { ...times[nextIndex] };
  }

  const currentSeconds = current.minutes * 60;
  const nextSeconds = next.minutes * 60;
  const remaining = Math.max(0, nextSeconds - nowSeconds);
  const progress = Math.min(
    0.96,
    Math.max(
      0.04,
      (nowSeconds - currentSeconds) /
        Math.max(1, nextSeconds - currentSeconds),
    ),
  );

  return { current, next, remaining, progress };
}

function PrayerGlyph({
  name,
  mirrored = false,
  className = "",
}: {
  name: GlyphName;
  mirrored?: boolean;
  className?: string;
}) {
  const url = `url("/icons/prayers/${name}.png")`;

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        transform: mirrored ? "scaleX(-1)" : undefined,
      }}
    />
  );
}

export function PrayerCard() {
  const [countries, setCountries] = useState<PrayerCountry[]>(
    FALLBACK_COUNTRIES,
  );
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY);
  const [zones, setZones] = useState<PrayerZone[]>(FALLBACK_ZONES);
  const [selectedZoneCode, setSelectedZoneCode] = useState(DEFAULT_ZONE);
  const [zonesLoading, setZonesLoading] = useState(true);
  const [month, setMonth] = useState<PrayerMonth | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());
  const zoneSelectedByUser = useRef(false);

  const zoned = getLocalNow(now);
  const selectedCountry =
    countries.find((country) => country.iso === countryIso) ??
    FALLBACK_COUNTRIES[0];
  const selectedZone =
    zones.find((zone) => zone.code === selectedZoneCode) ??
    zones[0] ??
    null;
  const schedule = getSchedule(month, zoned.date, zoned.seconds);
  const active = schedule != null;
  const progress = schedule?.progress ?? 0;

  const hours = Math.floor((schedule?.remaining ?? 0) / 3600);
  const minutes = Math.floor(((schedule?.remaining ?? 0) % 3600) / 60);
  const seconds = (schedule?.remaining ?? 0) % 60;

  const zoneLabel = selectedZone
    ? isOpaqueZone(selectedZone.code)
      ? selectedZone.zone
      : `${selectedZone.code} • ${selectedZone.state || selectedZone.zone}`
    : zonesLoading
      ? "Loading zones…"
      : "No zones";

  const pathRef = useRef<SVGPathElement | null>(null);
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchPrayerCountries(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted && data.length > 0) setCountries(data);
      })
      .catch(() => {
        // The fallback countries keep the flag picker usable.
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setZonesLoading(true);

    fetchPrayerZones(countryIso, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;

        const nextZones = data.length > 0 ? data : [];
        setZones(nextZones);

        const preferred =
          countryIso === DEFAULT_COUNTRY
            ? DEFAULT_ZONE
            : (nextZones[0]?.code ?? "");
        const nextCode = nextZones.some((zone) => zone.code === preferred)
          ? preferred
          : (nextZones[0]?.code ?? "");

        setSelectedZoneCode((current) =>
          zoneSelectedByUser.current &&
          nextZones.some((zone) => zone.code === current)
            ? current
            : nextCode,
        );
        setZonesLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        if (countryIso === DEFAULT_COUNTRY) {
          setZones(FALLBACK_ZONES);
          setSelectedZoneCode(DEFAULT_ZONE);
        } else {
          setZones([]);
          setSelectedZoneCode("");
        }
        setZonesLoading(false);
      });

    return () => controller.abort();
  }, [countryIso]);

  const monthKey = zoned.month;

  useEffect(() => {
    if (!selectedZoneCode) {
      setMonth(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setMonth(null);

    fetchPrayerMonth(
      countryIso,
      selectedZoneCode,
      monthKey,
      controller.signal,
    )
      .then((data) => {
        if (controller.signal.aborted) return;
        setMonth(data);
        setLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [countryIso, selectedZoneCode, monthKey]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !active) {
      setDot(null);
      return;
    }

    const point = path.getPointAtLength(path.getTotalLength() * progress);
    setDot({ x: point.x, y: point.y });
  }, [active, progress]);

  const changeCountry = (iso: string) => {
    if (iso === countryIso) return;

    zoneSelectedByUser.current = false;
    setCountryIso(iso);
    setZones([]);
    setSelectedZoneCode("");
    setZonesLoading(true);
    setMonth(null);
    setLoading(true);
  };

  const changeZone = (code: string) => {
    zoneSelectedByUser.current = true;
    setSelectedZoneCode(code);
  };

  const unavailableText =
    loading || zonesLoading
      ? "Loading prayer times…"
      : "Prayer times unavailable";

  return (
    <div className="relative flex aspect-square h-full flex-col bg-[#F9F8F6] p-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] lg:p-5 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <div className="relative flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-black/10 dark:ring-white/15">
            <img
              src={selectedCountry.flagUrl}
              alt={selectedCountry.name}
              className="h-full w-full object-cover"
            />
            <select
              aria-label="Country"
              value={countryIso}
              onChange={(event) => changeCountry(event.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 opacity-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
            >
              {countries.map((country) => (
                <option key={country.iso} value={country.iso}>
                  {flagEmoji(country.iso)} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex min-w-0 items-center gap-1.5 rounded-md py-0.5">
            <span className="min-w-0 truncate text-[clamp(12px,4.6cqw,14px)] font-medium">
              {zoneLabel}
            </span>
            <Icon
              name="chevronDown"
              className="h-3.5 w-3.5 shrink-0 text-ink-mute dark:text-dark-ink-mute"
            />
            <select
              aria-label="Prayer zone"
              value={selectedZoneCode}
              onChange={(event) => changeZone(event.target.value)}
              disabled={zones.length === 0}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 opacity-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:cursor-default [-webkit-tap-highlight-color:transparent]"
            >
              {zones.map((option) => (
                <option key={option.code} value={option.code}>
                  {isOpaqueZone(option.code)
                    ? option.zone
                    : `${option.code} • ${option.zone}`}{" "}
                  ({option.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        <img
          src={selectedCountry.logoUrl}
          alt={selectedCountry.name}
          title={`Prayer times by ${selectedCountry.methodName}`}
          className="h-4 w-auto shrink-0 dark:drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
        />
      </div>

      <div className="mt-[22px]">
        <p className="text-[12px] font-medium text-ink-mute dark:text-dark-ink-mute">
          Next prayer in
        </p>
        <p className="mt-2 whitespace-nowrap font-medium leading-none tracking-[-0.04em] tabular-nums text-[clamp(1.7rem,13.75cqw,3.3rem)]">
          {schedule
            ? `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`
            : "-- : -- : --"}
        </p>
        <div className="mt-2.5 flex items-center gap-2 text-[13px]">
          {schedule ? (
            <>
              <PrayerGlyph
                name={schedule.next.glyph}
                mirrored={schedule.next.mirrored}
                className="h-[18px] w-[18px] text-ink dark:text-dark-ink"
              />
              <span className="font-medium">{schedule.next.label}</span>
              <span className="text-ink-mute dark:text-dark-ink-mute">
                at {formatClock(schedule.next.displayMinutes)}
              </span>
            </>
          ) : (
            <span className="text-ink-mute dark:text-dark-ink-mute">
              {unavailableText}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-[18px]">
        <svg
          viewBox="0 0 300 96"
          className="h-auto w-full overflow-visible"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={ARC_PATH}
            fill="none"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeDasharray="1 7"
            className="stroke-[#D8D4CB] dark:stroke-[#2c2c27]"
          />
          <path
            d={ARC_PATH}
            fill="none"
            strokeWidth={3.5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${progress} 1`}
            className="stroke-primary"
          />
          {schedule && dot && (
            <>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={11}
                fillOpacity={0.12}
                className="fill-primary"
              />
              <circle
                cx={dot.x}
                cy={dot.y}
                r={5}
                className="fill-primary"
              />
              <circle
                cx={dot.x}
                cy={dot.y}
                r={1.8}
                fill="white"
                fillOpacity={0.9}
              />
            </>
          )}
        </svg>

        <div className="mt-1.5 flex items-start justify-between gap-2">
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-medium">
              {schedule?.current.label ?? "—"}
            </p>
            <p className="truncate text-[11px] text-ink-mute dark:text-dark-ink-mute">
              {schedule ? formatClock(schedule.current.displayMinutes) : ""}
            </p>
          </div>

          <div className="min-w-0 text-right leading-tight">
            <p className="truncate text-[12px] font-medium">
              {schedule?.next.label ?? "—"}
            </p>
            <p className="truncate text-[11px] text-ink-mute dark:text-dark-ink-mute">
              {schedule ? formatClock(schedule.next.displayMinutes) : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

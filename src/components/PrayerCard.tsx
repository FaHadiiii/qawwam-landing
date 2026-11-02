import { useLayoutEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

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

type Zone = {
  code: string;
  district: string;
  state: string;
  times: Record<PrayerKey, number>;
};

const ZONES: Zone[] = [
  {
    code: "SGR01",
    district: "Petaling",
    state: "Selangor",
    times: {
      fajr: 5 * 60 + 52,
      dhuhr: 13 * 60 + 15,
      asr: 16 * 60 + 35,
      maghrib: 19 * 60 + 14,
      isha: 20 * 60 + 26,
    },
  },
  {
    code: "WLY01",
    district: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    times: {
      fajr: 5 * 60 + 53,
      dhuhr: 13 * 60 + 16,
      asr: 16 * 60 + 36,
      maghrib: 19 * 60 + 15,
      isha: 20 * 60 + 27,
    },
  },
  {
    code: "JHR01",
    district: "Johor Bahru",
    state: "Johor",
    times: {
      fajr: 5 * 60 + 45,
      dhuhr: 13 * 60 + 8,
      asr: 16 * 60 + 28,
      maghrib: 19 * 60 + 7,
      isha: 20 * 60 + 19,
    },
  },
];

const DEMO_NOW = 15 * 3600 + 30 * 60 + 24;

const ARC_PATH = "M 12 82 C 82 12 218 12 288 82";

const pad = (value: number) => value.toString().padStart(2, "0");

function formatClock(minutes: number) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const hour = hour24 % 12 || 12;
  return `${hour}:${pad(minute)} ${hour24 >= 12 ? "PM" : "AM"}`;
}

function getSchedule(zone: Zone) {
  const timed = PRAYERS.map((prayer) => ({
    ...prayer,
    minutes: zone.times[prayer.key],
  }));
  const nextIndex = timed.findIndex((prayer) => prayer.minutes * 60 > DEMO_NOW);
  const resolvedNextIndex = nextIndex === -1 ? 0 : nextIndex;
  const current = timed[(resolvedNextIndex + timed.length - 1) % timed.length];
  const next = timed[resolvedNextIndex];

  const currentSeconds = current.minutes * 60;
  const nextSeconds =
    next.minutes * 60 + (nextIndex === -1 ? 24 * 3600 : 0);

  return {
    current,
    next,
    remaining: Math.max(0, nextSeconds - DEMO_NOW),
    progress: Math.min(
      0.96,
      Math.max(0.04, (DEMO_NOW - currentSeconds) / (nextSeconds - currentSeconds)),
    ),
  };
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
  const [zoneIndex, setZoneIndex] = useState(0);
  const zone = ZONES[zoneIndex];
  const { current, next, remaining, progress } = getSchedule(zone);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pathRef = useRef<SVGPathElement | null>(null);
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(path.getTotalLength() * progress);
    setDot({ x: point.x, y: point.y });
  }, [progress]);

  return (
    <div className="relative flex aspect-square h-full flex-col bg-[#F9F8F6] p-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] lg:p-5 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      <div className="flex items-start justify-between gap-2">
        <div className="relative flex min-w-0 items-center gap-1.5 rounded-md py-0.5 focus-within:ring-2 focus-within:ring-primary/25">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="min-w-0 truncate text-[clamp(12px,4.6cqw,14px)] font-medium">
            {zone.code}
            <span className="text-ink-mute dark:text-dark-ink-mute">
              {" "}
              • {zone.district}
            </span>
          </span>
          <Icon
            name="chevronDown"
            className="h-3.5 w-3.5 shrink-0 text-ink-mute dark:text-dark-ink-mute"
          />
          <select
            aria-label="Prayer zone"
            value={zoneIndex}
            onChange={(event) => setZoneIndex(Number(event.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
          >
            {ZONES.map((option, index) => (
              <option key={option.code} value={index}>
                {option.code} • {option.district}, {option.state}
              </option>
            ))}
          </select>
        </div>

        <img
          src="/icons/sources/jakim.png"
          alt="JAKIM"
          title="Prayer times by JAKIM"
          className="h-4 w-auto shrink-0 dark:drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
        />
      </div>

      <div className="mt-[22px]">
        <p className="text-[12px] font-medium text-ink-mute dark:text-dark-ink-mute">
          Next prayer in
        </p>
        <p className="mt-2 whitespace-nowrap font-medium leading-none tracking-[-0.04em] tabular-nums text-[clamp(1.7rem,13.75cqw,3.3rem)]">
          {pad(hours)} : {pad(minutes)} : {pad(seconds)}
        </p>
        <div className="mt-2.5 flex items-center gap-2 text-[13px]">
          <PrayerGlyph
            name={next.glyph}
            mirrored={next.mirrored}
            className="h-[18px] w-[18px] text-ink dark:text-dark-ink"
          />
          <span className="font-medium">{next.label}</span>
          <span className="text-ink-mute dark:text-dark-ink-mute">
            at {formatClock(next.minutes)}
          </span>
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
          {dot && (
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
            <p className="truncate text-[12px] font-medium">{current.label}</p>
            <p className="truncate text-[11px] text-ink-mute dark:text-dark-ink-mute">
              {formatClock(current.minutes)}
            </p>
          </div>

          <div className="min-w-0 text-right leading-tight">
            <p className="truncate text-[12px] font-medium">{next.label}</p>
            <p className="truncate text-[11px] text-ink-mute dark:text-dark-ink-mute">
              {formatClock(next.minutes)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

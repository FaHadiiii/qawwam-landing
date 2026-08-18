import { DeviceFrame } from "./DeviceFrame";
import {
  useIsMobile,
  useMouseParallax,
  useScrollParallax,
} from "../lib/motion";

const MAIN_W = 260;

const CHIPS = [
  {
    label: "Dhuhr",
    value: "12:45",
    className: "absolute -right-20 top-16 z-20",
    delay: "0.5s",
  },
  {
    label: "Tasbih",
    value: "33",
    className: "absolute -left-15 top-1/2 z-20",
    delay: "1s",
  },
  {
    label: "Qiblat",
    value: "23.5° NE",
    className: "absolute -right-10 bottom-16 z-20",
    delay: "1.5s",
  },
];

function FeatureChips({ mobile = false }: { mobile?: boolean }) {
  const positions: Record<string, string> = mobile
    ? {
        Dhuhr: "absolute -right-14 top-10 z-20",
        Tasbih: "absolute -left-12 top-1/2 z-20",
        Qiblat: "absolute -right-10 bottom-24 z-20",
      }
    : {
        Dhuhr: "absolute -right-20 top-16 z-20",
        Tasbih: "absolute -left-15 top-1/2 z-20",
        Qiblat: "absolute -right-10 bottom-16 z-20",
      };

  return (
    <>
      {CHIPS.map((chip) => (
        <div
          key={chip.label}
          aria-hidden
          className={`animate-chip absolute ${positions[chip.label]}`}
          style={{ animationDelay: chip.delay }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/80 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-lg shadow-primary/10 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80 dark:text-dark-ink sm:px-3.5 sm:py-2 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-ink-soft dark:text-dark-ink-soft">
              {chip.label}
            </span>
            <span>{chip.value}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export function HeroDevice() {
  const isMobile = useIsMobile();
  const { ref, shiftX, shiftY } = useMouseParallax();
  const parallax = useScrollParallax(0.1);

  if (isMobile) {
    return (
      <div className="relative mx-auto w-fit">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
          />
          <div className="animate-rise">
            <DeviceFrame
              name="home"
              alt="Qawwam home screen with prayer times"
              width={187.5}
            />
          </div>
          <FeatureChips mobile />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative mx-auto w-fit will-change-transform"
      style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute -inset-16 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
      />

      {/* Main phone */}
      <div className="animate-floaty relative z-10">
        <div className="animate-rise">
          <div
            style={{
              transform: `translate3d(${shiftX}px, ${shiftY}px, 0)`,
            }}
          >
            <DeviceFrame
              name="home"
              alt="Qawwam home screen with prayer times"
              width={MAIN_W}
            />
          </div>
        </div>
      </div>

      <FeatureChips />
    </div>
  );
}

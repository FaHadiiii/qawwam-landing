import { useEffect, useState } from "react";
import { MockFrame } from "react-mockframe";
import "react-mockframe/styles/mockframe-iphones.css";
import { useTheme } from "../lib/theme-context";
import { useMouseParallax, useScrollParallax } from "../lib/motion";

const DEVICE_W = 375;
const DEVICE_H = 812;
const ZOOM_MOBILE = 0.5;
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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function DeviceFrame({
  name,
  alt,
  width,
}: {
  name: string;
  alt: string;
  width: number;
}) {
  const { theme } = useTheme();
  const zoom = width / DEVICE_W;
  return (
    <div style={{ width, height: DEVICE_H * zoom }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
        <MockFrame
          device="iPhone 17"
          color="black"
          hideNotch
          style={{ width: DEVICE_W, height: DEVICE_H }}
        >
          <img
            src={`/screenshot/${theme}/${name}.png`}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </MockFrame>
      </div>
    </div>
  );
}

function FeatureChips() {
  return (
    <>
      {CHIPS.map((chip) => (
        <div
          key={chip.label}
          aria-hidden
          className={`animate-chip absolute ${chip.className}`}
          style={{ animationDelay: chip.delay }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/80 px-3.5 py-2 text-xs font-semibold text-ink shadow-lg shadow-primary/10 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80 dark:text-dark-ink">
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
              width={DEVICE_W * ZOOM_MOBILE}
            />
          </div>
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

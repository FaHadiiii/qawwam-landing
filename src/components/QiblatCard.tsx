import { useCallback, useEffect, useRef, useState } from "react";

type CompassOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading?: number;
};

type OrientationEventConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const KAABA = { lat: 21.4225, lon: 39.8262 };
const PETALING = { lat: 3.139, lon: 101.6869 };
const CARDINALS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

const clampAngle = (angle: number) => ((angle % 360) + 360) % 360;
const shortestDelta = (delta: number) => ((delta + 540) % 360) - 180;

function qiblaBearing(lat: number, lon: number) {
  const phi1 = (lat * Math.PI) / 180;
  const phi2 = (KAABA.lat * Math.PI) / 180;
  const deltaLon = ((KAABA.lon - lon) * Math.PI) / 180;
  const y = Math.sin(deltaLon);
  const x =
    Math.cos(phi1) * Math.tan(phi2) -
    Math.sin(phi1) * Math.cos(deltaLon);

  return clampAngle((Math.atan2(y, x) * 180) / Math.PI);
}

export function QiblatCard() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [heading, setHeading] = useState<number | null>(null);
  const [sensorActive, setSensorActive] = useState(false);
  const [compassPermissionRequired, setCompassPermissionRequired] =
    useState(false);
  const [compassRequested, setCompassRequested] = useState(false);
  const [compassUnavailable, setCompassUnavailable] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const orientationAttached = useRef(false);
  const continuousHeading = useRef(0);
  const hasHeading = useRef(false);
  const lastHeadingUpdate = useRef(0);
  const compassTimer = useRef<number | null>(null);

  const bearing = qiblaBearing(
    location?.lat ?? PETALING.lat,
    location?.lon ?? PETALING.lon,
  );
  const headingValue = heading ?? 0;
  const facing =
    sensorActive &&
    Math.abs(shortestDelta(bearing - headingValue)) <= 3;
  const bearingDegrees = Math.round(bearing) % 360;
  const compassPoint = CARDINALS[Math.round(bearing / 45) % 8];
  const sourceLabel = locating
    ? "Locating…"
    : location
      ? "Your location"
      : "Petaling";

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const compassEvent = event as CompassOrientationEvent;
    let raw: number | null = null;

    if (
      typeof compassEvent.webkitCompassHeading === "number" &&
      Number.isFinite(compassEvent.webkitCompassHeading)
    ) {
      raw = compassEvent.webkitCompassHeading;
    } else if (
      typeof event.alpha === "number" &&
      (event.absolute || event.type === "deviceorientationabsolute")
    ) {
      raw = 360 - event.alpha;
    }

    if (raw == null) return;

    const first = !hasHeading.current;
    const normalized = clampAngle(raw);
    const previous = hasHeading.current
      ? continuousHeading.current
      : normalized;
    const smoothed =
      previous + shortestDelta(normalized - clampAngle(previous)) * 0.25;

    continuousHeading.current = smoothed;
    hasHeading.current = true;

    if (compassTimer.current != null) {
      window.clearTimeout(compassTimer.current);
      compassTimer.current = null;
    }

    setSensorActive(true);
    setCompassUnavailable(false);

    const now = performance.now();
    if (first || now - lastHeadingUpdate.current >= 100) {
      lastHeadingUpdate.current = now;
      setHeading(smoothed);
    }
  }, []);

  const attachOrientation = useCallback(() => {
    if (orientationAttached.current || typeof window === "undefined") return;

    if (!("DeviceOrientationEvent" in window)) {
      setCompassUnavailable(true);
      return;
    }

    orientationAttached.current = true;
    setCompassRequested(true);
    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation as EventListener,
    );
    window.addEventListener(
      "deviceorientation",
      handleOrientation as EventListener,
    );

    if (compassTimer.current != null) {
      window.clearTimeout(compassTimer.current);
    }
    compassTimer.current = window.setTimeout(() => {
      compassTimer.current = null;
      setCompassUnavailable(true);
    }, 2000);
  }, [handleOrientation]);

  useEffect(() => {
    const orientationEvent =
      "DeviceOrientationEvent" in window
        ? (window.DeviceOrientationEvent as OrientationEventConstructor)
        : undefined;

    if (orientationEvent?.requestPermission) {
      setCompassPermissionRequired(true);
    } else {
      attachOrientation();
    }

    return () => {
      if (compassTimer.current != null) {
        window.clearTimeout(compassTimer.current);
        compassTimer.current = null;
      }
      if (!orientationAttached.current) return;

      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation as EventListener,
      );
      window.removeEventListener(
        "deviceorientation",
        handleOrientation as EventListener,
      );
      orientationAttached.current = false;
      hasHeading.current = false;
      continuousHeading.current = 0;
      lastHeadingUpdate.current = 0;
    };
  }, [attachOrientation, handleOrientation]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      requestLocation();
      return;
    }

    let requested = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (requested) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;

        requested = true;
        requestLocation();
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [requestLocation]);

  const enableCompass = async () => {
    const orientationEvent =
      "DeviceOrientationEvent" in window
        ? (window.DeviceOrientationEvent as OrientationEventConstructor)
        : undefined;

    if (!orientationEvent?.requestPermission) return;

    try {
      const permission = await orientationEvent.requestPermission();
      setCompassPermissionRequired(false);

      if (permission === "granted") {
        attachOrientation();
      } else {
        setCompassUnavailable(true);
      }
    } catch {
      setCompassPermissionRequired(false);
      setCompassUnavailable(true);
    }
  };

  const status = facing
    ? "Facing the Qiblat"
    : sensorActive
      ? "Turn until it points up"
      : compassPermissionRequired
        ? "Enable compass for live heading"
        : compassRequested && !compassUnavailable
          ? "Starting compass…"
          : "Compass unavailable";

  return (
    <div
      ref={cardRef}
      className="flex aspect-square h-full flex-col bg-[#F9F8F6] p-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <h3 className="min-w-0 truncate font-medium text-ink dark:text-dark-ink">
          Qiblat{" "}
          <span className="font-normal text-ink-mute dark:text-dark-ink-mute">
            · {sourceLabel}
          </span>
        </h3>
        <span className="shrink-0 font-medium text-primary">
          {bearingDegrees}° {compassPoint}
        </span>
      </div>

      <div className="relative flex-1">
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-2 bottom-2 -ml-px w-0 border-l-2 border-dotted transition-colors duration-300 ${
            facing
              ? "border-success"
              : "border-[#D8D4CB] dark:border-[#3a3a34]"
          }`}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 40 40"
            className="h-10 w-10"
            aria-hidden="true"
            style={{
              transform: `rotate(${bearing - headingValue}deg)`,
              transformOrigin: "50% 50%",
              transition: "transform 150ms linear",
            }}
          >
            <path d="M20 4 34 34 20 28 6 34Z" className="fill-primary" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 text-[10px]">
        <span
          aria-live="polite"
          className={`min-w-0 truncate ${
            facing
              ? "font-medium text-success"
              : "text-ink-mute dark:text-dark-ink-mute"
          }`}
        >
          {status}
        </span>
        {compassPermissionRequired && (
          <button
            type="button"
            onClick={enableCompass}
            className="shrink-0 font-medium text-primary transition-colors hover:text-primary/80"
          >
            Enable compass
          </button>
        )}
      </div>
    </div>
  );
}

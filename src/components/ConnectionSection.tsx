import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Icon } from "./Icon";
import { LeftHand, RightHand } from "./Hands";
import VariableProximity from "./VariableProximity";

const STEPS = [
  { icon: "link", title: "Link" },
  { icon: "check", title: "Share" },
  { icon: "love", title: "Grow" },
] as const;

function preSnapScale(value: number, start: number, snap: number) {
  const span = snap - start;
  if (span <= 0) return 1;
  const progress = Math.min(1, Math.max(0, (value - start) / span));
  return 1 + progress * 17;
}

function Device({ name, alt }: { name: string; alt: string }) {
  return (
    <div className="mx-auto w-[clamp(120px,20vw,240px)] rounded-[2rem] border border-white/25 bg-[#111] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <img
        src={`/screenshot/dark/${name}.png`}
        alt={alt}
        className="aspect-[1320/2868] w-full rounded-[1.5rem] object-cover"
      />
    </div>
  );
}

export function ConnectionSection() {
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  const [pinOffset, setPinOffset] = useState(0);
  const [expansionStart, setExpansionStart] = useState(0);
  const [filled, setFilled] = useState(false);
  const targetFull = useRef(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    const measure = () => {
      const pin = pinRef.current;
      const steps = stepsRef.current;
      const track = trackRef.current;
      if (!pin || !steps || !track) return;

      const pinRect = pin.getBoundingClientRect();
      const stepsRect = steps.getBoundingClientRect();
      const stepsCenter = stepsRect.top - pinRect.top + stepsRect.height / 2;
      const offset = window.innerHeight / 2 - stepsCenter;
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);

      setPinOffset(offset);
      setExpansionStart(Math.min(0.9, Math.max(0, -offset / travel)));
    };

    measure();
    window.addEventListener("resize", measure);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (pinRef.current) observer?.observe(pinRef.current);
    if (stepsRef.current) observer?.observe(stepsRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, []);

  const snapPoint = expansionStart + (1 - expansionStart) * 0.18;

  const targetScale = useMotionValue(1);
  const growScale = useSpring(targetScale, {
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  });
  const growRotate = useTransform(growScale, [1, 250], [0, 8]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const isFull = value >= snapPoint;
    targetFull.current = isFull;
    targetScale.set(
      isFull ? 250 : preSnapScale(value, expansionStart, snapPoint),
    );
    if (!isFull) setFilled(false);
  });

  useMotionValueEvent(growScale, "change", (value) => {
    if (targetFull.current && value > 240) setFilled(true);
  });

  useEffect(() => {
    const value = scrollYProgress.get();
    const isFull = value >= snapPoint;
    targetFull.current = isFull;
    targetScale.set(
      isFull ? 250 : preSnapScale(value, expansionStart, snapPoint),
    );
  }, [scrollYProgress, expansionStart, snapPoint, targetScale]);

  const titleOpacity = useTransform(
    scrollYProgress,
    [snapPoint + 0.02, snapPoint + 0.05, 0.9, 0.95],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    scrollYProgress,
    [snapPoint + 0.02, snapPoint + 0.05],
    [16, 0],
  );

  const slideOneOpacity = useTransform(
    scrollYProgress,
    [snapPoint + 0.03, snapPoint + 0.09, 0.5, 0.56],
    [0, 1, 1, 0],
  );
  const slideOneX = useTransform(scrollYProgress, [0.5, 0.56], [0, 80]);

  const slideTwoOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.62, 0.8, 0.87],
    [0, 1, 1, 0],
  );
  const slideTwoX = useTransform(scrollYProgress, [0.55, 0.62], [-80, 0]);

  return (
    <section
      id="connect"
      className="scroll-mt-24 overflow-clip pb-20 sm:pb-32"
    >
      <div className="mx-auto max-w-4xl px-5 pt-20 sm:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em]">
            Worship is personal.
            <br />
            <span className="text-ink-soft dark:text-dark-ink-soft">
              Never lonely.
            </span>
          </h2>

          <div ref={subtitleRef} className="mx-auto mt-5 max-w-md">
            <VariableProximity
              label="Qawwam is built around the people you trust. Link your worship without giving up your privacy."
              className="text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={subtitleRef}
              radius={110}
              falloff="linear"
              smoothing={0.2}
              scale={1}
              lift={0}
              idleWave={false}
            />
          </div>
        </div>
      </div>

      <div ref={trackRef} className="relative h-[400vh]">
        <div
          ref={pinRef}
          style={{ top: pinOffset }}
          className="sticky mx-auto max-w-4xl px-5"
        >
          <div className="relative mt-12 sm:mt-16">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                aria-hidden
                className="aspect-[4/5] bg-[#ececeb] dark:bg-dark-secondary"
              />
              <div
                aria-hidden
                className="aspect-[4/5] bg-[#ececeb] dark:bg-dark-secondary"
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end text-ink dark:text-dark-ink">
              <motion.span
                className="flex"
                initial={{ opacity: 0, x: -44 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <LeftHand className="h-14 w-auto sm:h-20" />
              </motion.span>

              <motion.span
                className="relative z-10 -ml-5 flex sm:-ml-8"
                initial={{ opacity: 0, x: 44 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <RightHand className="h-14 w-auto sm:h-20" />
              </motion.span>
            </div>
          </div>

          <div
            ref={stepsRef}
            className="mt-12 flex flex-col items-center gap-10 py-6 sm:mt-16 sm:flex-row sm:justify-center sm:gap-20 sm:py-10"
          >
            {STEPS.map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                {step.icon === "love" ? (
                  <motion.img
                    src="/love.svg"
                    alt=""
                    style={{ scale: growScale, rotate: growRotate }}
                    className="h-5 w-auto origin-center"
                  />
                ) : (
                  <Icon name={step.icon} className="h-5 w-5" />
                )}
                <h3 className="mt-2 text-sm font-medium">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {createPortal(
        <motion.div
          initial={false}
          animate={{ opacity: filled ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
        >
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-x-0 top-[12vh] text-center text-white"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
              Inside Qawwam
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.03em]">
              Everything, in one quiet place.
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: slideOneOpacity, x: slideOneX }}
            className="absolute inset-0 flex items-center justify-center px-6 pt-24"
          >
            <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-16">
              <Device name="home" alt="Qawwam prayer times screen" />
              <div className="text-white">
                <h3 className="text-[clamp(1.4rem,2.4vw,2.25rem)] leading-tight tracking-[-0.03em]">
                  Prayer, on time.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                  Accurate prayer times from official authorities, with a live
                  countdown that keeps your day in rhythm.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: slideTwoOpacity, x: slideTwoX }}
            className="absolute inset-0 flex items-center justify-center px-6 pt-24"
          >
            <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-16">
              <div className="text-white">
                <h3 className="text-[clamp(1.4rem,2.4vw,2.25rem)] leading-tight tracking-[-0.03em]">
                  The Qur'an, close.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                  Read, listen and reflect — with tajweed colouring,
                  translations and recitation in one place.
                </p>
              </div>
              <Device name="quran_2" alt="Qawwam Qur'an reader screen" />
            </div>
          </motion.div>
        </motion.div>,
        document.body,
      )}
    </section>
  );
}

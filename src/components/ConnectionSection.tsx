import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import phoneFrame from "../assets/images/phone-frame.png";
import thoughtBubble from "../assets/images/thought-bubble.svg";
import { useTheme } from "../lib/theme-context";
import { InsideQawwam } from "./InsideQawwam";
import { LeftHand, RightHand } from "./Hands";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import VariableProximity from "./VariableProximity";

const STEPS = [
  { icon: "link", title: "Link" },
  { icon: "check", title: "Share" },
  { icon: "love", title: "Grow" },
] as const;

const MESSAGES = [
  "Fajr prayed",
  "Qur'an · Al-Mulk",
  "Khatam 12 / 30",
  "Tasbih 100",
  "Surah Al-Kahf",
  "Du'a shared",
  "Prayer streak 7",
  "Poked you",
] as const;

function preSnapScale(value: number, start: number, snap: number) {
  const span = snap - start;
  if (span <= 0) return 1;
  const progress = Math.min(1, Math.max(0, (value - start) / span));
  return 1 + progress * 17;
}

function useRandomScreenCycle(active: boolean, initialDelay: number) {
  const [screen, setScreen] = useState<0 | 1>(0);
  const [title, setTitle] = useState<0 | 1>(0);
  const current = useRef<0 | 1>(0);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    const timers: number[] = [];
    const queue = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timers.push(id);
    };

    const cycle = () => {
      current.current = current.current === 0 ? 1 : 0;
      const nextScreen = current.current;

      setScreen(nextScreen);
      queue(() => setTitle(nextScreen), 450 + Math.random() * 900);
      queue(cycle, 3600 + Math.random() * 2800);
    };

    queue(cycle, initialDelay);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, initialDelay]);

  return { screen, title };
}

function ThoughtCard({
  lineOne,
  lineTwo,
  bubble,
  screen,
  mirror = false,
  isPartner = false,
}: {
  lineOne: string;
  lineTwo: string;
  bubble: string | null;
  screen: string;
  mirror?: boolean;
  isPartner?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)] ${
        isPartner
          ? "bg-[#F9F8F6] dark:bg-dark-secondary"
          : "bg-white dark:bg-dark-surface"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={lineOne}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="px-8 pt-[15%] text-center text-[clamp(1.4rem,6.5cqw,1.9rem)] font-medium leading-[1.25] tracking-[-0.03em]"
        >
          {lineOne}
          <br />
          <span className="text-ink-soft dark:text-dark-ink-soft">
            {lineTwo}
          </span>
        </motion.p>
      </AnimatePresence>

      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-[28%] w-[32%] ${
              mirror ? "right-2" : "left-2"
            }`}
          >
            <span className={`block w-full ${mirror ? "-scale-x-100" : ""}`}>
              <img
                src={thoughtBubble}
                alt=""
                aria-hidden="true"
                className="w-full dark:invert"
              />
            </span>
            <span className="absolute inset-x-[8%] top-[3%] bottom-[27%] flex items-center justify-center px-2">
              <span className="text-center font-caveat text-[clamp(14px,4.6cqw,18px)] font-medium leading-[1.05] text-ink dark:text-dark-ink">
                {bubble}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute left-1/2 top-[46%] w-[58%] -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: isPartner ? 0.12 : 0,
          }}
          className="relative"
        >
          <div className="absolute left-[8.5%] top-[4.3%] h-[91.4%] w-[82.9%] overflow-hidden rounded-[1rem]">
            <AnimatePresence initial={false}>
              <motion.img
                key={screen}
                src={screen}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <img src={phoneFrame} alt="" className="relative z-10 w-full" />
        </motion.div>
      </div>
    </div>
  );
}

export function ConnectionSection() {
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();
  const cardsInView = useInView(cardsRef, { amount: 0.35 });
  const left = useRandomScreenCycle(cardsInView, 2600);
  const right = useRandomScreenCycle(cardsInView, 4200);
  const leftScreens = [
    `/screenshot/${theme}/analytics.png`,
    `/screenshot/${theme}/share_card.png`,
  ];
  const rightScreens = [
    `/screenshot/${theme}/account_link_analytic.png`,
    `/screenshot/${theme}/notifications.png`,
  ];
  const turn = useRef<0 | 1>(0);
  const messageIndex = useRef(0);
  const [bubble, setBubble] = useState<{
    side: "left" | "right";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!cardsInView) return;

    let cancelled = false;
    const timers: number[] = [];
    const queue = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timers.push(id);
    };

    const show = () => {
      const side = turn.current === 0 ? "left" : "right";
      const text = MESSAGES[messageIndex.current % MESSAGES.length];

      messageIndex.current += 1;
      turn.current = turn.current === 0 ? 1 : 0;
      setBubble({ side, text });
      queue(() => {
        setBubble(null);
        queue(show, 500);
      }, 2400);
    };

    queue(show, 1200);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      setBubble(null);
    };
  }, [cardsInView]);

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

  return (
    <section id="connect" className="scroll-mt-24 overflow-clip">
      <div className="mx-auto max-w-5xl px-5 pt-20 sm:pt-32">
        <Reveal className="mx-auto max-w-2xl text-center">
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
        </Reveal>
      </div>

      <div ref={trackRef} className="relative h-[400vh]">
        <div
          ref={pinRef}
          style={{ top: pinOffset }}
          className="sticky mx-auto max-w-5xl px-5"
        >
          <Reveal className="relative mt-12 sm:mt-16">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <ThoughtCard
                lineOne={left.title === 0 ? "A quick look at" : "A verse worth"}
                lineTwo={left.title === 0 ? "your own progress." : "sharing."}
                bubble={bubble?.side === "left" ? bubble.text : null}
                screen={leftScreens[left.screen]}
              />
              <ThoughtCard
                lineOne={
                  right.title === 0 ? "A shared glance" : "A gentle nudge"
                }
                lineTwo={
                  right.title === 0
                    ? "of your partner's."
                    : "from your partner."
                }
                bubble={bubble?.side === "right" ? bubble.text : null}
                screen={rightScreens[right.screen]}
                mirror
                isPartner
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

          </Reveal>

          <motion.div
            ref={stepsRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 flex flex-row items-start justify-center gap-12 py-6 sm:mt-16 sm:gap-20 sm:py-10"
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
          </motion.div>
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: filled ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 ${filled ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {filled && <InsideQawwam />}
          </motion.div>
        </div>

        <div
          id="showcase"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-px w-px"
        />
      </div>
    </section>
  );
}

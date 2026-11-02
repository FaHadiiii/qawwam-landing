import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const CONFETTI_COLORS = ["#2965e4", "#5cb85c", "#f0c030", "#CE4A58"];

const CONFETTI = Array.from({ length: 30 }, (_, index) => {
  const angle = (index / 30) * Math.PI * 2;
  const distance = 36 + (index % 5) * 13;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 28,
    rotate: (index % 2 === 0 ? 1 : -1) * (90 + (index % 4) * 75),
    size: 3 + (index % 3),
    color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    delay: (index % 6) * 0.015,
  };
});

export function PrayerTrackerCard() {
  const [prayed, setPrayed] = useState([true, true, false, false, false]);
  const [celebrating, setCelebrating] = useState(false);
  const wasComplete = useRef(false);

  const todayCount = prayed.filter(Boolean).length;
  const isComplete = todayCount === PRAYERS.length;

  useEffect(() => {
    if (!isComplete) {
      wasComplete.current = false;
      setCelebrating(false);
      return;
    }
    if (wasComplete.current) return;

    wasComplete.current = true;
    setCelebrating(true);
    const timer = window.setTimeout(() => setCelebrating(false), 1400);
    return () => window.clearTimeout(timer);
  }, [isComplete]);

  return (
    <div className="relative flex aspect-square h-full flex-col bg-white p-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {celebrating && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
          {CONFETTI.map((piece, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: piece.x,
                y: piece.y,
                scale: 1,
                rotate: piece.rotate,
              }}
              transition={{
                duration: 1.05,
                delay: piece.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-10 left-1/2 rounded-[1px]"
              style={{
                width: piece.size,
                height: piece.size * 1.8,
                backgroundColor: piece.color,
              }}
            />
          ))}
        </div>
      )}

      <h3 className="mt-1 text-center text-[clamp(1.2rem,5.6cqw,1.7rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink dark:text-dark-ink">
        Keep track of
        <br />
        <span className="text-[#9c9898] dark:text-[#767369]">
          your prayer
        </span>
      </h3>

      <div className="mt-3 flex flex-col">
        {PRAYERS.map((prayer, index) => {
          const isPrayed = prayed[index];

          return (
            <button
              key={prayer}
              type="button"
              aria-pressed={isPrayed}
              aria-label={`${prayer}: ${isPrayed ? "Prayed" : "Missed"}`}
              onClick={() =>
                setPrayed((current) =>
                  current.map((value, itemIndex) =>
                    itemIndex === index ? !value : value,
                  ),
                )
              }
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 dark:hover:bg-dark-secondary"
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                  isPrayed
                    ? "border-primary bg-primary text-white"
                    : "border-[#D8D4CB] text-transparent dark:border-[#3a3a34]"
                }`}
              >
                <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
              </span>

              <span className="min-w-0 flex-1 truncate text-[clamp(12px,4.4cqw,14px)] text-ink dark:text-dark-ink">
                {prayer}
              </span>

              <span
                className={`shrink-0 text-[clamp(11px,3.8cqw,12px)] transition-colors duration-200 ${
                  isPrayed
                    ? "text-primary"
                    : "text-ink-mute dark:text-dark-ink-mute"
                }`}
              >
                {isPrayed ? "Prayed" : "Missed"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-[10px] leading-none">
          <span className="text-ink-mute dark:text-dark-ink-mute">Today</span>
          <span
            className={`font-medium transition-colors duration-300 ${
              isComplete ? "text-success" : "text-primary"
            }`}
          >
            {todayCount} / {PRAYERS.length}
          </span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden bg-[#E9E6DF] dark:bg-dark-border">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              isComplete ? "bg-success" : "bg-primary"
            }`}
            style={{ width: `${(todayCount / PRAYERS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

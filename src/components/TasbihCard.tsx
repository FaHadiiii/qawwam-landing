import { useEffect, useState } from "react";

const TARGET = 100;
const TOTAL_TICKS = 100;

const ADHKAR = [
  { arabic: "لَا إِلَهَ إِلَّا الله", transliteration: "La ilaha illallah" },
  { arabic: "سُبْحَانَ الله", transliteration: "Subhanallah" },
  { arabic: "الْحَمْدُ لِلَّه", transliteration: "Alhamdulillah" },
  { arabic: "اللهُ أَكْبَر", transliteration: "Allahu Akbar" },
  { arabic: "أَسْتَغْفِرُ الله", transliteration: "Astaghfirullah" },
];

const TICKS = Array.from({ length: TOTAL_TICKS }, (_, index) => {
  const angle = (index / TOTAL_TICKS) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 5 === 0;
  const inner = isMajor ? 82 : 88;
  const outer = 94;

  return {
    index,
    isMajor,
    x1: 100 + Math.cos(angle) * inner,
    y1: 100 + Math.sin(angle) * inner,
    x2: 100 + Math.cos(angle) * outer,
    y2: 100 + Math.sin(angle) * outer,
  };
});

export function TasbihCard() {
  const [count, setCount] = useState(54);
  const [dhikrIndex, setDhikrIndex] = useState(0);
  const dhikr = ADHKAR[dhikrIndex];
  const activeTicks = Math.round((count / TARGET) * TOTAL_TICKS);

  useEffect(() => {
    if (count < TARGET) return;
    const timer = window.setTimeout(() => {
      setDhikrIndex((index) => (index + 1) % ADHKAR.length);
      setCount(0);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [count]);

  return (
    <button
      type="button"
      onClick={() => {
        if (count < TARGET) setCount((value) => value + 1);
      }}
      aria-label={`Tasbih counter: ${count} of ${TARGET} ${dhikr.transliteration}. Tap to count.`}
      className="flex aspect-square h-full w-full cursor-pointer items-center justify-center bg-[#F9F8F6] p-4 text-center shadow-[0_1px_4px_rgba(23,22,15,0.08)] transition-transform duration-150 [container-type:inline-size] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.99] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
    >
      <div className="relative aspect-square w-[82%]">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {TICKS.map((tick) => (
            <line
              key={tick.index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              strokeWidth={tick.isMajor ? 1.6 : 1}
              strokeLinecap="round"
              className={`transition-colors duration-200 ${
                tick.index < activeTicks
                  ? "stroke-primary"
                  : "stroke-[#D8D4CB] dark:stroke-[#33332d]"
              }`}
            />
          ))}
        </svg>

        <div className="absolute inset-[17%] flex flex-col items-center justify-center">
          <p className="font-arabic text-[clamp(0.9rem,4.8cqw,1.2rem)] leading-[1.7] text-ink dark:text-dark-ink">
            {dhikr.arabic}
          </p>
          <p className="mt-0.5 text-[clamp(1.7rem,9.5cqw,2.45rem)] font-medium leading-none tabular-nums text-ink dark:text-dark-ink">
            {count}
            <span className="ml-1 text-[0.38em] font-normal text-ink-mute dark:text-dark-ink-mute">
              / {TARGET}
            </span>
          </p>
          <p className="mt-1 text-[clamp(9px,2.7cqw,11px)] text-ink-mute dark:text-dark-ink-mute">
            {dhikr.transliteration}
          </p>
        </div>
      </div>
    </button>
  );
}

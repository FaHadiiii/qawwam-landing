import { useEffect, useState } from "react";

const SURAH_GLYPH = "\uF100";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5 translate-x-[1px]"
    >
      <path d="M8 5.5v13l11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <rect x="7" y="5" width="3.5" height="14" rx="1" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}

export function SurahCard() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(52);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress((value) => (value >= 94 ? 18 : value + 0.7));
    }, 350);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className="flex aspect-square h-full flex-col bg-white px-3 py-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      <div className="relative flex-1 overflow-hidden bg-[#F9F8F6] dark:bg-dark-secondary">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] right-[7%] select-none font-surah text-[clamp(1.1rem,6.2cqw,1.65rem)] leading-none text-[#D8D4CB] dark:text-[#383831]"
        >
          {SURAH_GLYPH}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[clamp(12px,4.4cqw,14px)] font-medium leading-tight">
            Al Fatihah
          </p>
          <div className="mt-1 h-[3px] overflow-hidden bg-[#E9E6DF] dark:bg-dark-border">
            <div
              className="h-full bg-primary transition-[width] duration-500 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause Al Fatihah" : "Play Al Fatihah"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform active:scale-95 dark:bg-dark-ink dark:text-dark-bg"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { LottieSvg } from "lottie-react";
import flameAnimation from "../assets/lottie/flame.json";

export function KhatamCard() {
  const [mode, setMode] = useState<"solo" | "group">("solo");

  const soloJuz = 18;
  const groupJuz = 24;

  const currentJuz = mode === "solo" ? soloJuz : groupJuz;
  const progressPercent = Math.round((currentJuz / 30) * 100);

  return (
    <div className="flex aspect-square h-full flex-col justify-between bg-white px-3 py-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {/* Top-left two-toned title (text has same optical top and left padding as Menstrual card) */}
      <div className="pt-1 pl-2 pr-2 text-left sm:pt-2 sm:pl-3 sm:pr-3">
        <p className="text-[clamp(1.2rem,5.6cqw,1.7rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink dark:text-dark-ink">
          <span>Complete Quran,</span>
          <br />
          <span className="text-[#55524d] dark:text-[#a09d94]">solo </span>
          <span className="text-[#9c9898] dark:text-[#767369]">or together</span>
        </p>
      </div>

      {/* Bottom subtle feature card (matches Surah card boundary) */}
      <div className="mt-6 flex flex-1 w-full flex-col justify-between bg-[#F9F8F6] p-3.5 sm:mt-7 sm:p-4 dark:bg-dark-secondary">
        {/* Header: Solo / Group selector in pill shape + Flame streak on right (no card background) */}
        <div className="flex items-center justify-between gap-2">
          {/* Mode switch - pill shape */}
          <div
            className="flex items-center rounded-full bg-black/5 p-0.5 dark:bg-white/10"
            role="tablist"
            aria-label="Khatam mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "solo"}
              onClick={() => setMode("solo")}
              className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors sm:px-3 sm:py-1 sm:text-[11px] ${
                mode === "solo"
                  ? "bg-white text-ink shadow-xs dark:bg-dark-surface dark:text-dark-ink"
                  : "text-[#767369] hover:text-ink dark:text-[#a09d94] dark:hover:text-dark-ink"
              }`}
            >
              Solo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "group"}
              onClick={() => setMode("group")}
              className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors sm:px-3 sm:py-1 sm:text-[11px] ${
                mode === "group"
                  ? "bg-white text-ink shadow-xs dark:bg-dark-surface dark:text-dark-ink"
                  : "text-[#767369] hover:text-ink dark:text-[#a09d94] dark:hover:text-dark-ink"
              }`}
            >
              Group
            </button>
          </div>

          {/* Fire streak - without card background, compact flame lottie */}
          <div className="flex items-center gap-1 text-[#55524d] dark:text-[#a09d94]">
            <div
              className="relative flex h-5 w-3.5 items-center justify-center"
              aria-hidden="true"
            >
              <div className="pointer-events-none absolute flex items-center justify-center translate-y-[1px]">
                <LottieSvg
                  src={flameAnimation}
                  autoplay
                  loop
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>
            <span className="text-[11px] font-semibold tabular-nums sm:text-xs">
              {mode === "solo" ? "14 days" : "6 days"}
            </span>
          </div>
        </div>

        {/* Progress section aligned to bottom */}
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs">
            <span className="truncate font-medium text-ink dark:text-dark-ink">
              {mode === "solo" ? "Personal Khatam" : "Family Quran Circle"}
            </span>
            <span className="shrink-0 font-semibold text-primary">
              {progressPercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full bg-black/8 dark:bg-white/10">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#767369] sm:text-[11px] dark:text-[#a09d94]">
            <span>
              {mode === "solo"
                ? `Juz ${soloJuz} of 30`
                : `${groupJuz} of 30 Juz completed`}
            </span>
            <span>
              {mode === "solo"
                ? `${30 - soloJuz} Juz left`
                : "4 members active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

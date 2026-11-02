import { useAccent, ACCENT_PRESETS } from "../lib/theme-context";

export function StyleCard() {
  const { accentColor, setAccentColor } = useAccent();

  return (
    <div className="relative flex aspect-square h-full flex-col items-center justify-between bg-white p-6 pb-8 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] sm:p-7 sm:pb-9 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {/* Top optical balance space */}
      <div className="h-4 w-full shrink-0" aria-hidden="true" />

      {/* Two-toned text at center with generous bottom padding */}
      <div className="flex flex-col items-center justify-center text-center pb-8 sm:pb-12">
        <p className="text-[clamp(1.2rem,5.6cqw,1.7rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink dark:text-dark-ink">
          <span>Style it, The</span>
          <br />
          <span className="text-[#55524d] dark:text-[#a09d94]">way </span>
          <span className="text-[#9c9898] dark:text-[#767369]">you want</span>
        </p>
      </div>

      {/* 3 grid of color squares on bottom side (smaller size) */}
      <div
        role="radiogroup"
        aria-label="Accent color"
        className="flex items-center justify-center gap-1.5"
      >
        {ACCENT_PRESETS.map((preset) => {
          const isSelected = preset.value === accentColor;
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={preset.label}
              onClick={() => setAccentColor(preset.value)}
              className={`h-6 w-6 cursor-pointer rounded-[2px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-7 sm:w-7 ${
                isSelected
                  ? "ring-2 ring-[#dcdcdc] dark:ring-neutral-500"
                  : "hover:opacity-90 active:scale-95"
              }`}
              style={{ backgroundColor: preset.value }}
            />
          );
        })}
      </div>
    </div>
  );
}

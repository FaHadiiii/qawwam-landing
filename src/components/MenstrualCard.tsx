import { useState } from "react";
import { Icon } from "./Icon";

const DAYS = [
  { day: "M", date: 12, isPeriod: true },
  { day: "T", date: 13, isPeriod: true },
  { day: "W", date: 14, isPeriod: true },
  { day: "T", date: 15, isPeriod: true },
  { day: "F", date: 16, isPeriod: true },
  { day: "S", date: 17, isPeriod: false },
  { day: "S", date: 18, isPeriod: false },
] as const;

export function MenstrualCard() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (Day 3)

  const currentDay = DAYS[selectedDay];

  return (
    <div className="relative flex aspect-square h-full flex-col overflow-hidden bg-white p-5 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] sm:p-6 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {/* Top-left two-toned title */}
      <div className="text-left">
        <p className="text-[clamp(1.2rem,5.6cqw,1.7rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink dark:text-dark-ink">
          <span>Keep track of</span>
          <br />
          <span className="text-[#55524d] dark:text-[#a09d94]">your </span>
          <span className="text-[#9c9898] dark:text-[#767369]">menstrual</span>
        </p>
      </div>

      {/* Half-cropped bottom-left rose tracking card */}
      <div className="absolute bottom-0 left-0 flex h-[62%] w-[89%] flex-col justify-between bg-[#dc1b4b] p-3.5 text-white sm:h-[64%] sm:p-4">
        {/* Header row: phase tag and Salah status */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-2 py-1 text-[11px] font-medium backdrop-blur-xs">
            <Icon
              name={currentDay.isPeriod ? "drop" : "check"}
              className="h-3 w-3 fill-current text-white"
            />
            <span>
              {currentDay.isPeriod
                ? `Day ${selectedDay + 1} • Period`
                : `Day ${selectedDay + 1} • Clean (Tuhr)`}
            </span>
          </div>

          <span className="text-[11px] font-medium text-white/85">
            {currentDay.isPeriod ? "Salah excused" : "Salah active"}
          </span>
        </div>

        {/* 7-day interactive cycle strip */}
        <div className="my-auto py-1">
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((item, idx) => {
              const isSelected = selectedDay === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDay(idx)}
                  className={`group relative flex cursor-pointer flex-col items-center py-1.5 transition-all ${
                    isSelected
                      ? "scale-105 bg-white text-[#dc1b4b] shadow-sm"
                      : "text-white/90 hover:bg-white/15 active:scale-95"
                  }`}
                >
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected ? "text-[#dc1b4b]" : "text-white/70"
                    }`}
                  >
                    {item.day}
                  </span>
                  <span
                    className={`mt-0.5 text-[12px] font-semibold leading-none ${
                      isSelected ? "text-[#dc1b4b]" : "text-white"
                    }`}
                  >
                    {item.date}
                  </span>
                  <span className="mt-1 flex h-2 w-2 items-center justify-center">
                    {item.isPeriod ? (
                      <span
                        className={`h-1.5 w-1.5 ${
                          isSelected ? "bg-[#dc1b4b]" : "bg-white"
                        }`}
                      />
                    ) : isSelected ? (
                      <Icon
                        name="check"
                        className="h-2 w-2 text-[#dc1b4b]"
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info row */}
        <div className="flex items-center justify-between border-t border-white/20 pt-1.5 text-[10px] text-white/85 sm:text-[11px]">
          <span className="truncate">
            {currentDay.isPeriod
              ? "Streak protected • 5d makeup"
              : "Prayers active • 5/5 on time"}
          </span>
          <span className="shrink-0 font-medium text-white">28d cycle</span>
        </div>
      </div>
    </div>
  );
}

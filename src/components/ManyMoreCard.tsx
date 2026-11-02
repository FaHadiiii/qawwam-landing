import { useState } from "react";
import { FEATURES } from "../data/features";
import { Icon } from "./Icon";

export function ManyMoreCard() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex aspect-square h-full flex-col bg-white p-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      <div aria-hidden="true" className="grid grid-cols-6 gap-1">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            onMouseEnter={() => setHovered(feature.title)}
            onMouseLeave={() => setHovered(null)}
            className="flex aspect-square items-center justify-center rounded-[3px] bg-[#F5F4F1] transition-colors hover:bg-[#ECE9E3] dark:bg-dark-secondary dark:hover:bg-dark-border"
          >
            <Icon
              name={feature.icon}
              className="h-[40%] w-[40%] text-ink-mute dark:text-dark-ink-mute"
            />
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
        <span className="min-w-0 truncate text-[11px] text-ink-mute dark:text-dark-ink-mute">
          {hovered}
        </span>
        <p className="shrink-0 text-[clamp(1rem,5.6cqw,1.45rem)] font-medium tracking-[-0.03em] text-ink dark:text-dark-ink">
          And much more...
        </p>
      </div>
    </div>
  );
}

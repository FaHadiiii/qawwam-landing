import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "./Icon";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function JourneyCard() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDist = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    const size = maxDist * 2;

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="relative flex aspect-square h-full cursor-pointer select-none flex-col justify-between overflow-hidden bg-primary p-6 text-white shadow-[0_1px_4px_rgba(23,22,15,0.08)] transition-all duration-300 active:scale-[0.99] [container-type:inline-size] sm:p-7 dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Top-left icon */}
      <div className="relative z-10 flex items-start">
        <Icon
          name="userGroup"
          className="h-7 w-7 text-white sm:h-8 sm:w-8"
          strokeWidth="1.8"
        />
      </div>

      {/* Bottom-left title */}
      <div className="relative z-10 text-left">
        <p className="text-[clamp(1.2rem,5.2cqw,1.65rem)] font-medium leading-[1.25] tracking-[-0.03em] text-white">
          Join the journey
          <br />
          together.
        </p>
      </div>
    </div>
  );
}


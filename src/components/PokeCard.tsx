import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";

const CATEGORIES = [
  "Prayer",
  "Quran",
  "Menstrual",
  "Fasting",
  "Tahajjud",
] as const;

export function PokeCard() {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [activeDir, setActiveDir] = useState<"toPartner" | "toYou">("toPartner");
  const [isPoking, setIsPoking] = useState(false);

  const handlePoke = () => {
    if (isPoking) return;
    setIsPoking(true);

    // Cycle category
    setCategoryIdx((prev) => (prev + 1) % CATEGORIES.length);

    // After animation completes, flip direction for next poke
    window.setTimeout(() => {
      setIsPoking(false);
      setActiveDir((prev) => (prev === "toPartner" ? "toYou" : "toPartner"));
    }, 650);
  };

  return (
    <button
      type="button"
      onClick={handlePoke}
      aria-label={`Poke interaction for ${CATEGORIES[categoryIdx]}. Tap to poke.`}
      className="group relative flex aspect-square h-full w-full cursor-pointer flex-col items-center justify-between overflow-hidden bg-white p-5 text-center shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] sm:p-6 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
    >
      {/* Top optical balance space */}
      <div className="h-2 w-full shrink-0" aria-hidden="true" />

      {/* Center: Small circle avatars connected by dotted line + sharp subtle text card */}
      <div className="my-auto flex w-full flex-col items-center justify-center">
        {/* Avatars + Dotted line with tight gap */}
        <div className="flex w-full max-w-[145px] items-center justify-between sm:max-w-[160px]">
          {/* Left Avatar: You */}
          <motion.div
            animate={
              isPoking && activeDir === "toYou"
                ? { scale: [1, 1.25, 0.92, 1.1, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.45, delay: 0.38, ease: "easeOut" }}
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-xs sm:h-9 sm:w-9 dark:ring-dark-surface"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
              alt="You"
              className="h-full w-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
            />
          </motion.div>

          {/* Dotted line with animated bidirectional filling progress bar */}
          <div className="relative mx-2.5 flex flex-1 items-center sm:mx-3">
            {/* Base dotted line */}
            <div className="h-0 w-full border-t-2 border-dotted border-black/20 dark:border-white/25" />

            {/* Filling progress bar (travels towards Partner or towards You) */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
              <motion.div
                key={activeDir}
                className={`h-[2px] bg-[#55524d] dark:bg-[#a09d94] ${
                  activeDir === "toPartner" ? "mr-auto" : "ml-auto"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: isPoking ? "100%" : "0%" }}
                transition={{
                  duration: isPoking ? 0.45 : 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>

          {/* Right Avatar: Partner */}
          <motion.div
            animate={
              isPoking && activeDir === "toPartner"
                ? { scale: [1, 1.25, 0.92, 1.1, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.45, delay: 0.38, ease: "easeOut" }}
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-xs sm:h-9 sm:w-9 dark:ring-dark-surface"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
              alt="Partner"
              className="h-full w-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
            />
          </motion.div>
        </div>

        {/* Swapping category sentence with increased top space */}
        <div className="mt-8 text-center sm:mt-9">
          <p className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-ink sm:text-[13px] dark:text-dark-ink">
            <span>
              {activeDir === "toPartner"
                ? "Poke partner for"
                : "Partner poked for"}
            </span>
            <span className="bg-[#F5F4F1] px-2 py-0.5 font-medium text-[#55524d] dark:bg-dark-secondary dark:text-[#a09d94]">
              {CATEGORIES[categoryIdx]}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom part: icon only in grey */}
      <div className="flex items-center justify-center pb-1">
        <motion.div
          animate={isPoking ? { scale: 0.88, y: -2 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            name="handClick"
            className="h-4 w-4 text-[#9c9898] transition-colors group-hover:text-[#6e6b63] sm:h-5 sm:w-5 dark:text-[#767369] dark:group-hover:text-[#a09d94]"
          />
        </motion.div>
      </div>
    </button>
  );
}

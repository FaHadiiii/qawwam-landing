import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const DUAS = [
  {
    title: "For knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    meaning: "My Lord, increase me in knowledge.",
    source: "Surah Ta-Ha 20:114",
  },
  {
    title: "For ease & courage",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    meaning: "My Lord, expand for me my chest and ease for me my task.",
    source: "Surah Ta-Ha 20:25-26",
  },
  {
    title: "For parents",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    meaning: "My Lord, have mercy upon them as they brought me up when I was small.",
    source: "Surah Al-Isra 17:24",
  },
  {
    title: "For a firm heart",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
    meaning: "O Turner of the hearts, keep my heart firm upon Your religion.",
    source: "Jami' at-Tirmidhi 2140",
  },
  {
    title: "For goodness in both worlds",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً",
    meaning: "Our Lord, give us in this world that which is good and in the Hereafter that which is good.",
    source: "Surah Al-Baqarah 2:201",
  },
] as const;

export function DuaCard() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeDua = DUAS[currentIdx];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIdx((prev) => (prev + newDirection + DUAS.length) % DUAS.length);
  };

  // Auto-swipe every 5.5 seconds, resetting whenever currentIdx changes
  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % DUAS.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isPaused, currentIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -35) {
      paginate(1);
    } else if (deltaX > 35) {
      paginate(-1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex aspect-square h-full flex-col items-center justify-between overflow-hidden bg-[#F9F8F6] p-5 text-center shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] sm:p-6 dark:bg-dark-secondary dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
    >
      {/* Top side: small title in natural sentence case */}
      <div className="pt-0.5 text-center">
        <p className="text-xs font-medium text-ink-mute sm:text-[13px] dark:text-dark-ink-mute">
          {activeDua.title}
        </p>
      </div>

      {/* Center: Arabic with Meaning directly underneath, swipeable */}
      <div className="my-auto flex w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIdx}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (offset.x < -35 || swipe < -100) {
                paginate(1);
              } else if (offset.x > 35 || swipe > 100) {
                paginate(-1);
              }
            }}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex w-full cursor-grab flex-col items-center justify-center px-1 text-center select-none active:cursor-grabbing"
          >
            {/* Arabic script */}
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-[clamp(1.3rem,6.2cqw,1.75rem)] font-normal leading-[1.8] text-ink select-none sm:leading-[1.9] dark:text-dark-ink"
            >
              {activeDua.arabic}
            </p>

            {/* Meaning directly under Arabic */}
            <p className="mt-2.5 max-w-[90%] text-[clamp(11px,3.5cqw,13px)] leading-relaxed text-[#55524d] dark:text-[#a09d94]">
              "{activeDua.meaning}"
            </p>

            {/* Reference source */}
            <span className="mt-1 text-[10px] text-[#9c9898] dark:text-[#767369]">
              {activeDua.source}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom side: only compact pill shape indicators */}
      <div
        className="flex items-center justify-center gap-1 pb-0.5"
        role="tablist"
        aria-label="Dua pagination"
      >
        {DUAS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIdx ? 1 : -1);
              setCurrentIdx(idx);
            }}
            aria-label={`Go to dua ${idx + 1}`}
            className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${
              currentIdx === idx
                ? "w-2.5 bg-primary"
                : "w-1 bg-black/15 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

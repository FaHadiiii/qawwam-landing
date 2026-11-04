import { motion } from "motion/react";
import { useTheme } from "../lib/theme-context";
import { PhoneCarousel, type ImageItem } from "./PhoneCarousel";

const SCREENS = [
  { name: "home", label: "Home" },
  { name: "prayer_guide", label: "Prayer guide" },
  { name: "quran_2", label: "Qur'an reader" },
  { name: "quran_audio", label: "Qur'an audio" },
  { name: "dua", label: "Duas & dhikr" },
  { name: "tasbih", label: "Tasbih" },
  { name: "qiblat", label: "Qiblat" },
  { name: "khatam", label: "Khatam" },
  { name: "analytics", label: "Analytics" },
  { name: "account_link", label: "Linked accounts" },
  { name: "share_card", label: "Share card" },
  { name: "notifications", label: "Notifications" },
  { name: "quran_1", label: "Qur'an" },
] as const;

export function InsideQawwam() {
  const { theme } = useTheme();

  const images: ImageItem[] = SCREENS.map((screen) => ({
    src: `/screenshot/${theme}/${screen.name}.png`,
    alt: `Qawwam ${screen.label} screen`,
  }));

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#DC1B4B] text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex flex-col items-center px-4 pt-8 text-center sm:px-5 sm:pt-14"
      >
        <h2
          style={{ color: "#ffffff" }}
          className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.03em] text-white mt-6 sm:mt-0"
        >
          Everything you need
          <br />
          to stay connected.
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-2 max-w-[18rem] text-xs leading-relaxed text-white/70 sm:mt-3 sm:max-w-md sm:text-sm"
        >
          Explore the screens that hold your day together.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.9,
          delay: 0.15,
        }}
        className="relative mt-8 flex-1 overflow-hidden sm:mt-12"
      >
        <PhoneCarousel images={images} />
      </motion.div>
    </div>
  );
}

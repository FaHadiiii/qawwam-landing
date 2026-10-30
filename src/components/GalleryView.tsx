import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";

const SCREENS = [
  { name: "home", label: "Home" },
  { name: "quran_1", label: "Qur'an" },
  { name: "quran_2", label: "Qur'an reader" },
  { name: "prayer_guide", label: "Prayer guide" },
  { name: "dua", label: "Duas" },
  { name: "tasbih", label: "Tasbih" },
  { name: "qiblat", label: "Qiblat" },
  { name: "analytics", label: "Analytics" },
  { name: "account_link", label: "Linked accounts" },
];

export function GalleryView({
  onClose,
  delay = 0,
}: {
  onClose: () => void;
  delay?: number;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousHtml = document.documentElement.style.overflow;
    const previousBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Qawwam gallery"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#07080d] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-[10%] top-0 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(41,101,228,0.22),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[20%] h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,27,75,0.16),transparent_65%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#07080d]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <img
            src="/icons/logo-white.png"
            alt="Qawwam"
            className="h-6 w-auto"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
          The Gallery
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Inside Qawwam.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {SCREENS.map((screen) => (
            <figure key={screen.name}>
              <img
                src={`/screenshot/dark/${screen.name}.png`}
                alt={`Qawwam ${screen.label} screen`}
                loading="lazy"
                className="aspect-[1320/2868] w-full rounded-md border border-white/10 object-cover"
              />
              <figcaption className="mt-2.5 text-[11px] uppercase tracking-[0.16em] text-white/40">
                {screen.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

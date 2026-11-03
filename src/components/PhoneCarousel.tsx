import { useEffect, useState } from "react";
import { motion } from "motion/react";
import phoneFrame from "../assets/images/phone-frame.png";
import { Icon } from "./Icon";

export interface ImageItem {
  src: string;
  alt: string;
}

function PhoneMockup({ image }: { image: ImageItem }) {
  return (
    <div className="relative w-full">
      <div className="absolute left-[8.5%] top-[4.3%] h-[91.4%] w-[82.9%] overflow-hidden rounded-[1.1rem]">
        <img
          src={image.src}
          alt={image.alt}
          draggable={false}
          className="h-full w-full object-cover object-top select-none"
        />
      </div>
      <img
        src={phoneFrame}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="relative z-10 w-full select-none"
      />
    </div>
  );
}

function CarouselControls({
  paused,
  onToggle,
  onPrevious,
  onNext,
}: {
  paused: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous screen"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-[#2a2924] active:scale-95 sm:h-10 sm:w-10"
      >
        <Icon
          name="chevronDown"
          className="h-3.5 w-3.5 rotate-90 sm:h-4 sm:w-4"
        />
      </button>

      <button
        type="button"
        onClick={onToggle}
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-[#2a2924] active:scale-95 sm:h-10 sm:w-10"
      >
        {paused ? (
          <Icon
            name="play"
            className="h-3.5 w-3.5 translate-x-[1px] sm:h-4 sm:w-4"
          />
        ) : (
          <span className="flex items-center gap-[3px]">
            <span className="h-2.5 w-[2px] rounded-full bg-current sm:h-3" />
            <span className="h-2.5 w-[2px] rounded-full bg-current sm:h-3" />
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next screen"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-[#2a2924] active:scale-95 sm:h-10 sm:w-10"
      >
        <Icon
          name="chevronDown"
          className="h-3.5 w-3.5 -rotate-90 sm:h-4 sm:w-4"
        />
      </button>
    </div>
  );
}

export function PhoneCarousel({
  images,
  interval = 4200,
}: {
  images: ImageItem[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const count = images.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, interval);
    return () => window.clearInterval(id);
  }, [active, count, interval, paused]);

  const previous = () =>
    setActive((current) => (current - 1 + count) % count);
  const next = () => setActive((current) => (current + 1) % count);

  const offsetFor = (index: number) => {
    const raw = index - active;
    return (((raw + count / 2) % count) + count) % count - count / 2;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="relative aspect-[1419/2796] w-[clamp(230px,78vw,400px)]">
        {images.map((image, index) => {
          const offset = offsetFor(index);
          const distance = Math.abs(offset);
          const isCenter = distance < 0.5;
          const scale = isCenter ? 1 : distance < 1.5 ? 0.82 : 0.7;
          const opacity = isCenter ? 1 : distance < 1.5 ? 0.5 : 0;

          return (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 60 }}
              animate={{
                x: `${offset * (isMobile ? 56 : 63)}%`,
                y: 0,
                scale,
                opacity,
                filter: isCenter ? "grayscale(0)" : "grayscale(1)",
              }}
              transition={{
                x: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
                y: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
                scale: {
                  type: "spring",
                  stiffness: 220,
                  damping: 30,
                  mass: 0.9,
                },
                opacity: { duration: 0.35, ease: "easeInOut" },
                filter: { duration: 0.35, ease: "easeInOut" },
              }}
              style={{
                zIndex: Math.round(100 - distance * 10),
                transformOrigin: isMobile ? "center center" : "bottom center",
              }}
              aria-hidden={isCenter ? undefined : true}
              className={`absolute inset-0 ${
                isCenter
                  ? "drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
                  : ""
              }`}
            >
              <PhoneMockup image={image} />
            </motion.div>
          );
        })}

        <div className="absolute bottom-[32%] left-1/2 z-[200] hidden -translate-x-1/2 sm:block">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CarouselControls
              paused={paused}
              onToggle={() => setPaused((current) => !current)}
              onPrevious={previous}
              onNext={next}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 sm:hidden"
      >
        <CarouselControls
          paused={paused}
          onToggle={() => setPaused((current) => !current)}
          onPrevious={previous}
          onNext={next}
        />
      </motion.div>
    </div>
  );
}

import { useRef } from "react";
import { motion } from "motion/react";
import { StoreBadges } from "./StoreBadges";
import VariableProximity from "./VariableProximity";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="pt-14 pb-14 sm:pt-20 sm:pb-20">
      <div className="mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md text-center"
        >
          <div ref={containerRef}>
            <VariableProximity
              label="Qawwam brings prayer times, the Qur'an and duas into one quiet place."
              className="text-[15px] leading-7 text-ink-soft sm:text-[17px] sm:leading-8 dark:text-dark-ink-soft"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={containerRef}
              radius={110}
              falloff="linear"
              smoothing={0.2}
              scale={1}
              lift={0}
              idleWave={false}
              emphasis="Qawwam"
              emphasisFontVariationSettings="'wght' 600"
            />
          </div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <StoreBadges />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

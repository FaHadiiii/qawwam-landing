import { motion } from "motion/react";

const PLACEHOLDER_COUNT = 15;

export function FeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
            <motion.div
              key={index}
              aria-hidden
              className="aspect-square bg-[#ececeb] dark:bg-dark-secondary"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

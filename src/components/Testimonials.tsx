import { useRef } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import VariableProximity from "./VariableProximity";

const TESTIMONIALS = [
  {
    name: "Aisyah R.",
    quote:
      "Qawwam uses the official JAKIM timetable for my area, so every salah starts to the minute. It is the most reliable app I have used.",
  },
  {
    name: "Muhammad F.",
    quote:
      "Linking with my siblings changed everything. We poke each other when one of us misses a prayer, and sharing our progress keeps us accountable.",
  },
  {
    name: "Nurul H.",
    quote:
      "The Qur'an reader is stunning — tajweed colouring, translation and recitation in one place, and I can jump to any ayah just by reciting it.",
  },
];

function Stars() {
  return (
    <div
      className="flex justify-center gap-0.5 text-amber-400"
      aria-label="5 star rating"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em]">
            Loved by the
            <br />
            <span className="text-ink-soft dark:text-dark-ink-soft">
              ummah
            </span>
          </h2>

          <div ref={subtitleRef} className="mx-auto mt-5 max-w-md">
            <VariableProximity
              label="Early users on why Qawwam has become part of their daily routine."
              className="text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={subtitleRef}
              radius={110}
              falloff="linear"
              smoothing={0.2}
              scale={1}
              lift={0}
              idleWave={false}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col border border-border p-6 text-center dark:border-dark-secondary"
            >
              <blockquote className="flex-1 text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-6">
                <Stars />
                <p className="mt-3 text-[11px] tracking-[0.04em] text-ink-mute dark:text-dark-ink-mute">
                  {testimonial.name}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Aisyah R.",
    role: "Kuala Lumpur, MY",
    quote:
      "The prayer times are exact — Qawwam uses the official JAKIM timetable for my area, so every salah starts to the minute. It is the most reliable app I have used.",
  },
  {
    name: "Muhammad F.",
    role: "Singapore, SG",
    quote:
      "Linking with my siblings changed everything. We poke each other when one of us misses a prayer, and sharing our progress keeps us accountable.",
  },
  {
    name: "Nurul H.",
    role: "Jakarta, ID",
    quote:
      "The Qur'an reader is stunning — tajweed colouring, translation and recitation in one place, and I can jump to any ayah just by reciting it.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-border py-20 dark:border-dark-border sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-mute dark:text-dark-ink-mute">
              Voices
            </p>
            <h2 className="mt-6 max-w-md text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.04em]">
              Loved by the ummah.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-ink-soft md:justify-self-end dark:text-dark-ink-soft">
            Early users on why Qawwam has become part of their daily routine.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="border-t border-border pt-6 dark:border-dark-border"
            >
              <blockquote className="text-[17px] leading-8 tracking-[-0.01em]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-mute dark:text-dark-ink-mute">
                {testimonial.name} · {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

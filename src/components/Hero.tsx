import { HeroDevice } from './HeroDevice'
import { StoreBadges } from './StoreBadges'
import { useReveal } from '../lib/motion'

export function Hero() {
  const badgeRef = useReveal<HTMLSpanElement>(0.1)
  const headingRef = useReveal<HTMLHeadingElement>(0.1)
  const textRef = useReveal<HTMLParagraphElement>(0.1)
  const ctaRef = useReveal<HTMLDivElement>(0.1)

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl dark:from-primary/10"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span
            ref={badgeRef}
            className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-ink-soft dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your complete Islamic companion
          </span>

          <h1
            ref={headingRef}
            className="reveal mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-1px] sm:text-6xl"
            style={{ transitionDelay: '80ms' }}
          >
            Every prayer.
            <br />
            <span className="bg-gradient-to-r from-primary to-[#5b8def] bg-clip-text text-transparent">
              Every dua.
            </span>
            <br />
            In one app.
          </h1>

          <p
            ref={textRef}
            className="reveal mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg md:mx-0 dark:text-dark-ink-soft"
            style={{ transitionDelay: '160ms' }}
          >
            Qawwam brings together prayer times, the Qur\'an with tajweed and audio, duas, tasbih,
            qiblat and personal tracking — thoughtfully designed, offline-capable, and available in
            English, Malay and Arabic.
          </p>

          <div
            ref={ctaRef}
            className="reveal mt-9 flex justify-center md:justify-start"
            style={{ transitionDelay: '240ms' }}
          >
            <StoreBadges />
          </div>
        </div>

        <HeroDevice />
      </div>
    </section>
  )
}

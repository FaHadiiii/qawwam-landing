const TESTIMONIALS = [
  {
    name: 'Aisyah R.',
    role: 'Kuala Lumpur, MY',
    quote:
      'The prayer arc on the home screen is genius — I always know exactly how much time is left for the next salah at a glance.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    name: 'Muhammad F.',
    role: 'Singapore, SG',
    quote:
      'Beautiful Qur\'an with tajweed colours and audio recitation. The voice search actually finds the ayah I\'m thinking of.',
    avatar: 'https://i.pravatar.cc/80?img=68',
  },
  {
    name: 'Nurul H.',
    role: 'Jakarta, ID',
    quote:
      'I use the tasbih and daily duas every single day. Having everything — prayers, Qur\'an, duas — in one clean app is a blessing.',
    avatar: 'https://i.pravatar.cc/80?img=45',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Loved by the ummah
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            Early users are already making Qawwam part of their daily routine.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-card border border-border bg-surface p-6 dark:border-dark-border dark:bg-dark-surface"
            >
              <div className="flex gap-0.5 text-amber-400" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft dark:text-dark-ink-soft">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5 dark:border-dark-border">
                <img
                  src={t.avatar}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-ink-mute dark:text-dark-ink-mute">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

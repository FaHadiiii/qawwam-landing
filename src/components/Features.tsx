import { FEATURES } from '../data/features'
import { Icon, type IconName } from './Icon'

const iconAccents: Record<IconName, string> = {
  quran: 'bg-primary/10 text-primary',
  clock: 'bg-amber-500/10 text-amber-500',
  dua: 'bg-emerald-500/10 text-emerald-500',
  tasbih: 'bg-violet-500/10 text-violet-500',
  compass: 'bg-rose-500/10 text-rose-500',
  calendar: 'bg-sky-500/10 text-sky-500',
  heart: 'bg-pink-500/10 text-pink-500',
  chart: 'bg-indigo-500/10 text-indigo-500',
  moon: 'bg-teal-500/10 text-teal-500',
  globe: 'bg-blue-500/10 text-blue-500',
  sun: 'bg-amber-500/10 text-amber-500',
  menu: 'bg-primary/10 text-primary',
  close: 'bg-primary/10 text-primary',
  arrowRight: 'bg-primary/10 text-primary',
  chevronDown: 'bg-primary/10 text-primary',
  play: 'bg-primary/10 text-primary',
  check: 'bg-primary/10 text-primary',
  moonStar: 'bg-primary/10 text-primary',
  sunBright: 'bg-primary/10 text-primary',
  drop: 'bg-rose-500/10 text-rose-500',
  plus: 'bg-primary/10 text-primary',
  link: 'bg-primary/15 text-primary',
  offline: 'bg-emerald-500/10 text-emerald-500',
  mosque: 'bg-teal-500/10 text-teal-500',
  restaurant: 'bg-orange-500/10 text-orange-500',
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to stay connected
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            A complete toolkit for daily worship — from the day's prayers to the beauty of the
            Qur'an and the remembrance of Allah.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-card border border-border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:border-dark-border dark:bg-dark-surface"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconAccents[feature.icon]}`}
              >
                <Icon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-dark-ink-soft">
                {feature.description}
              </p>
            </article>
          ))}
          <div key="more-to-come" className="col-span-full mt-6 flex items-center justify-center gap-2.5 sm:mt-8">
            <Icon name="plus" className="h-4 w-4 flex-none text-ink-mute dark:text-dark-ink-mute" />
            <p className="text-center text-sm text-ink-soft dark:text-dark-ink-soft">
              <span className="font-semibold">More to come</span> — and much more on the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

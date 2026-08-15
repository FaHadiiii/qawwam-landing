import { FEATURE_STATS } from '../data/features'

export function Stats() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-card border border-border bg-gradient-to-br from-surface to-secondary/60 p-8 sm:p-10 dark:border-dark-border dark:from-dark-surface dark:to-dark-secondary/40">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="bg-gradient-to-r from-primary to-[#5b8def] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

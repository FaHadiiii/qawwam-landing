import { PhoneFrame } from './PhoneFrame'

const SCREENSHOTS = [
  { name: 'home', label: 'Home' },
  { name: 'quran_1', label: 'Qur\'an' },
  { name: 'quran_2', label: 'Qur\'an reader' },
  { name: 'qiblat', label: 'Qiblat' },
  { name: 'tasbih', label: 'Tasbih' },
  { name: 'analytics', label: 'Analytics' },
  { name: 'account_link', label: 'Account' },
  { name: 'account_link_analytic', label: 'Insights' },
]

export function ScreenshotShowcase() {
  return (
    <section id="gallery" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            See Qawwam in action
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            Thoughtfully designed for daily worship — every screen, right from the app.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent dark:from-dark-bg"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent dark:from-dark-bg"
          />
          <div className="no-scrollbar mt-14 flex snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth px-6 pb-4 sm:px-10">
            {SCREENSHOTS.map((shot) => (
              <div key={shot.name} className="flex-none snap-center">
                <PhoneFrame
                  name={shot.name}
                  alt={`Qawwam ${shot.label} screen`}
                  className="w-[220px] sm:w-[240px]"
                  glow={false}
                />
                <p className="mt-5 text-center text-sm font-semibold text-ink-soft dark:text-dark-ink-soft">
                  {shot.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

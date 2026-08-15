import { StoreBadges } from './StoreBadges'

export function DownloadCTA() {
  return (
    <section id="download" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#5b8def]/20 blur-3xl"
          />

          <div className="relative">
            <img
              src="/icons/app-icon.png"
              alt="Qawwam app icon"
              className="mx-auto h-20 w-20 rounded-[22px] shadow-2xl"
            />
            <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Start your Qawwam journey today
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Download for free and bring prayer times, the Qur\'an, duas and tasbih — together —
              everywhere you go.
            </p>

            <div className="mt-10 flex justify-center">
              <StoreBadges />
            </div>

            <p className="mt-5 text-xs text-white/50">
              Requires iOS 15+ or Android 8+ · Free to download
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

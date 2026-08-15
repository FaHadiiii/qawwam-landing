import { StoreBadges } from './StoreBadges'

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Glow behind the phone */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl"
      />
      <div className="relative overflow-hidden rounded-[44px] border border-border bg-surface shadow-2xl dark:border-dark-border dark:bg-dark-surface">
        {/* Notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
        {/* Screen */}
        <div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[38px] bg-gradient-to-b from-navy via-navy to-[#0d1633] px-4 pt-12 text-white">
          {/* Date header */}
          <div className="text-center">
            <p className="text-[11px] font-medium text-white/70">Friday · 15 Aug 2026</p>
            <p className="mt-0.5 text-lg font-bold tracking-tight">11 Safar 1448</p>
          </div>

          {/* Prayer arc */}
          <div className="mt-6">
            <div className="relative h-20">
              <svg viewBox="0 0 250 80" className="h-full w-full" fill="none">
                <path
                  d="M12 66 C 75 10, 175 10, 238 66"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 66 C 75 10, 175 10, 238 66"
                  stroke="#5b8def"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="1100"
                  strokeDashoffset="600"
                />
                {[0, 0.2, 0.4, 0.6, 0.8].map((t) => {
                  const x = 12 + t * 226
                  const y = 66 - Math.sin(Math.PI * t) * 56
                  const passed = t <= 0.45
                  return (
                    <circle
                      key={t}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={passed ? '#fff' : 'rgba(255,255,255,0.25)'}
                      stroke={passed ? '#2965e4' : 'transparent'}
                      strokeWidth="2"
                    />
                  )
                })}
              </svg>
            </div>
            <div className="-mt-2 grid grid-cols-5 text-center text-[10px]">
              {['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'].map((p, i) => (
                <div key={p} className="flex flex-col items-center gap-0.5">
                  <span className={i <= 2 ? 'font-semibold text-white' : 'font-medium text-white/50'}>
                    {p}
                  </span>
                  <span className={i <= 2 ? 'text-white/70' : 'text-white/30'}>
                    {['5:34', '1:15', '4:36', '7:20', '8:32'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-5 text-center">
            <p className="text-2xl font-bold tabular-nums tracking-tight">02 : 14 : 36</p>
            <p className="mt-0.5 text-[11px] font-medium text-white/70">
              Asar in 2h 14m ·{' '}
              <span className="text-primary-soft">7:20</span>
            </p>
          </div>

          {/* Cards */}
          <div className="mt-6 flex flex-col gap-2.5">
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.08] px-3.5 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-[11px] font-bold text-white">
                  ✓
                </div>
                <div>
                  <p className="text-[12px] font-semibold">Prayer streak</p>
                  <p className="text-[10px] text-white/60">12 days · 59/60 prayers</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                96%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.08] px-3.5 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[11px]">
                  🕌
                </div>
                <div>
                  <p className="text-[12px] font-semibold">Daily Dua</p>
                  <p className="text-[10px] text-white/60">Morning & evening adhkar</p>
                </div>
              </div>
              <span className="text-white/40 text-[11px]">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl dark:from-primary/10"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-ink-soft dark:border-dark-border dark:bg-dark-surface dark:text-dark-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your complete Islamic companion
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-1px] sm:text-6xl">
            Every prayer.
            <br />
            <span className="bg-gradient-to-r from-primary to-[#5b8def] bg-clip-text text-transparent">
              Every dua.
            </span>
            <br />
            In one app.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg md:mx-0 dark:text-dark-ink-soft">
            Qawwam brings together prayer times, the Qur\'an with tajweed and audio, duas, tasbih,
            qiblat and personal tracking — thoughtfully designed, offline-capable, and available in
            English, Malay and Arabic.
          </p>

          <div className="mt-9 flex justify-center md:justify-start">
            <StoreBadges />
          </div>

          <p className="mt-4 text-xs text-ink-mute dark:text-dark-ink-mute">
            Free to download · Available on iOS & Android
          </p>
        </div>

        <PhoneMockup />
      </div>
    </section>
  )
}

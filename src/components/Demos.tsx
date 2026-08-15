import { useState } from 'react'
import { Icon } from './Icon'

function PrayerArcDemo() {
  const [progress, setProgress] = useState(45)
  const prayers = [
    { name: 'Subuh', time: '5:34', icon: '🌅' },
    { name: 'Zohor', time: '1:15', icon: '☀️' },
    { name: 'Asar', time: '4:36', icon: '🌤️' },
    { name: 'Maghrib', time: '7:20', icon: '🌇' },
    { name: 'Isyak', time: '8:32', icon: '🌙' },
  ]
  const p = progress / 100

  const yAt = (t: number) => 70 - Math.sin(Math.PI * t) * 52

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <svg viewBox="0 0 260 90" className="h-auto w-full" fill="none">
          <path
            d="M10 74 C 75 12, 185 12, 250 74"
            stroke="var(--color-border)"
            strokeWidth="4"
            strokeLinecap="round"
            className="dark:stroke-[#2a2a2a]"
          />
          <path
            d="M10 74 C 75 12, 185 12, 250 74"
            stroke="#2965e4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1400"
            strokeDashoffset={String(1400 * (1 - p))}
          />
          {prayers.map((prayer, i) => {
            const t = i / (prayers.length - 1)
            const passed = t <= p
            return (
              <g key={prayer.name}>
                <circle
                  cx={10 + t * 240}
                  cy={yAt(t)}
                  r="5"
                  fill={passed ? '#fff' : 'transparent'}
                  stroke={passed ? '#2965e4' : 'var(--color-ink-mute)'}
                  strokeWidth="2.5"
                />
                <text
                  x={10 + t * 240}
                  y={yAt(t) - 14}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={passed ? 700 : 500}
                  fill={passed ? 'var(--color-ink)' : 'var(--color-ink-mute)'}
                  className="dark:fill-[#e0e0e0]"
                >
                  {prayer.icon}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="mt-1 grid w-full grid-cols-5 text-center text-xs">
        {prayers.map((prayer, i) => (
          <div key={prayer.name}>
            <p className={`font-semibold ${i / (prayers.length - 1) <= p ? '' : 'text-ink-mute dark:text-dark-ink-mute'}`}>
              {prayer.name}
            </p>
            <p className={`tabular-nums ${i / (prayers.length - 1) <= p ? 'text-ink-soft dark:text-dark-ink-soft' : 'text-ink-mute/60 dark:text-dark-ink-mute/60'}`}>
              {prayer.time}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex w-full flex-col items-center gap-2">
        <p className="text-2xl font-bold tabular-nums tracking-tight">
          {(2.14 + (0.45 - p) * 10).toFixed(2).padStart(5, '0').replace('.', ' : ')}
        </p>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          aria-label="Simulate prayer time progress"
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-secondary)] accent-[#2965e4] dark:bg-dark-secondary"
        />
        <p className="text-xs text-ink-mute dark:text-dark-ink-mute">
          Drag to preview how prayer times progress through the day
        </p>
      </div>
    </div>
  )
}

function QiblatCompassDemo() {
  const [angle, setAngle] = useState(72)
  const rotate = angle - 45

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/10 blur-2xl"
        />
        <div className="relative h-52 w-52">
          <div
            className="absolute inset-0 rounded-full border border-border bg-gradient-to-b from-secondary to-surface transition-transform duration-500 dark:border-dark-border dark:from-dark-secondary dark:to-dark-surface"
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map((d, i) => (
              <span
                key={d}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-ink-mute dark:text-dark-ink-mute"
                style={{
                  transform: `translate(-50%,-50%) rotate(${i * 45}deg) translateY(-92px) rotate(${-i * 45}deg)`,
                }}
              >
                {d}
              </span>
            ))}
          </div>
          {/* Needle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-40 w-1.5">
              <div
                className="absolute left-1/2 top-0 h-[58%] w-full -translate-x-1/2 rounded-t-full bg-[#2965e4] shadow-lg"
                style={{ transformOrigin: 'bottom center', transform: 'translateX(-50%)' }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#2965e4]">
                  Q
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 h-[42%] w-full -translate-x-1/2 rounded-b-full bg-rose-500" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-surface dark:border-dark-border dark:bg-dark-surface" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold">
        Qiblat · <span className="tabular-nums">71° NE</span>
      </p>
      <input
        type="range"
        min={0}
        max={359}
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
        aria-label="Adjust qiblat bearing"
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-secondary)] accent-[#2965e4] dark:bg-dark-secondary"
      />
      <p className="mt-2 text-xs text-ink-mute dark:text-dark-ink-mute">
        Drag to see the compass needle align with the Kaabah
      </p>
    </div>
  )
}

function TasbihDemo() {
  const [count, setCount] = useState(0)
  const target = 33
  const dhikr = 'سُبْحَانَ اللَّهِ'
  const dhikrTrans = 'SubhanAllah — Glory be to Allah'

  const handleTap = () => setCount((c) => (c + 1 > target ? 0 : c + 1))

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="text-2xl font-bold" dir="rtl" lang="ar">
          {dhikr}
        </p>
        <p className="mt-1 text-xs text-ink-soft dark:text-dark-ink-soft">{dhikrTrans}</p>
      </div>

      <button
        type="button"
        onClick={handleTap}
        className="group relative mt-7 flex h-44 w-44 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-[#2965e4] to-[#1d4fc2] text-white shadow-[0_12px_40px_rgba(41,101,228,0.4)] transition active:scale-95"
        aria-label={`Count ${dhikr}. Currently ${count} of ${target}.`}
      >
        <span className="absolute inset-2 rounded-full border-2 border-white/20" />
        <span className="text-center">
          <span className="block text-5xl font-extrabold tabular-nums tracking-tight">{count}</span>
          <span className="mt-1 block text-xs font-medium text-white/70">of {target}</span>
        </span>
      </button>

      <div className="mt-6 flex w-full items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-secondary)] dark:bg-dark-secondary">
          <div
            className="h-full rounded-full bg-[#2965e4] transition-all duration-200"
            style={{ width: `${(count / target) * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:bg-secondary dark:border-dark-border dark:text-dark-ink-soft dark:hover:bg-dark-secondary"
        >
          Reset
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-mute dark:text-dark-ink-mute">
        Tap the bead to count — with vibration on your phone
      </p>
    </div>
  )
}

export function Demos() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Not just a picture — try the app
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            Three signature experiences, live in your browser. This is exactly how they feel in the
            app.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <div className="rounded-card border border-border bg-surface p-7 dark:border-dark-border dark:bg-dark-surface">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="clock" className="h-5 w-5" />
              </div>
              <h3 className="font-bold">Prayer Times</h3>
            </div>
            <div className="mt-7">
              <PrayerArcDemo />
            </div>
          </div>

          <div className="rounded-card border border-border bg-surface p-7 dark:border-dark-border dark:bg-dark-surface">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                <Icon name="compass" className="h-5 w-5" />
              </div>
              <h3 className="font-bold">Qiblat Compass</h3>
            </div>
            <div className="mt-7">
              <QiblatCompassDemo />
            </div>
          </div>

          <div className="rounded-card border border-border bg-surface p-7 dark:border-dark-border dark:bg-dark-surface">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <Icon name="tasbih" className="h-5 w-5" />
              </div>
              <h3 className="font-bold">Tasbih Counter</h3>
            </div>
            <div className="mt-7">
              <TasbihDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

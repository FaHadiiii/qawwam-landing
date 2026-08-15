import { useState } from 'react'
import { Icon } from './Icon'

const VERSES = [
  {
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'The Most Merciful, the Most Compassionate',
    surah: 'Al-Fatihah 1:3',
  },
  {
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'You alone we worship, and You alone we ask for help.',
    surah: 'Al-Fatihah 1:5',
  },
  {
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ',
    translation: 'So remember Me; I will remember you.',
    surah: 'Al-Baqarah 2:152',
  },
  {
    arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    translation: 'And say, "My Lord, increase me in knowledge."',
    surah: 'Ta-Ha 20:114',
  },
]

export function QuranShowcase() {
  const [active, setActive] = useState(0)
  const verse = VERSES[active]

  return (
    <section id="quran" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        {/* Verse card */}
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-primary/10 to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-card border border-border bg-surface p-8 shadow-xl shadow-primary/5 dark:border-dark-border dark:bg-dark-surface">
            {/* Top ornament */}
            <div className="flex items-center justify-between border-b border-border pb-4 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name="quran" className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Qur\'an</p>
                  <p className="text-xs text-ink-mute dark:text-dark-ink-mute">With tajweed & audio</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Listen to verse"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_16px_rgba(41,101,228,0.4)] transition hover:scale-105"
              >
                <Icon name="play" className="ml-0.5 h-5 w-5" />
              </button>
            </div>

            <div className="py-10 text-center">
              <p
                key={active}
                className="animate-[fadeUp_0.4s_ease-out] text-[28px] leading-[2] font-semibold text-ink sm:text-[32px] dark:text-dark-ink"
                dir="rtl"
                lang="ar"
              >
                {verse.arabic}
              </p>
              <p className="mt-6 text-base italic text-ink-soft dark:text-dark-ink-soft">
                “{verse.translation}”
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">{verse.surah}</p>
            </div>

            {/* Verse picker */}
            <div className="flex items-center justify-center gap-2">
              {VERSES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show verse ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-6 bg-primary' : 'w-2 bg-ink-mute/40 hover:bg-ink-mute/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Qur\'an</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            The mushaf, beautifully brought to life
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft dark:text-dark-ink-soft">
            Read the Qur\'an the way it deserves to be read. Qawwam renders authentic Uthmani text
            with tajweed colouring so you can recite confidently, and pairs it with high-quality
            audio recitations, translations and transliteration.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              ['Tajweed colouring', 'Pronunciation rules colour-coded directly on the text.'],
              ['Audio recitations', 'Multiple world-renowned reciters, streamed or saved for offline.'],
              ['Voice search', 'Long-press the mic and say a phrase to jump to the exact ayah.'],
              ['Bookmarks, notes & progress', 'Track your reading with insights in the analytics tab.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-ink-soft dark:text-dark-ink-soft">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

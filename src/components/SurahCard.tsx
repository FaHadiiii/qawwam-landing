import { useRef, useState } from "react";
import { SURAH_NAMES } from "../data/surahs";
import { useTheme } from "../lib/theme-context";
import { Icon } from "./Icon";
import Waves from "./Waves";

const RECITER = "ar.alafasy";

const audioUrlFor = (surah: number) =>
  `https://cdn.islamic.network/quran/audio-surah/128/${RECITER}/${surah}.mp3`;

const glyphFor = (surah: number) => String.fromCharCode(0xf100 + surah - 1);

function formatDuration(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";
  const total = Math.floor(value);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5 translate-x-[1px]"
    >
      <path d="M8 5.5v13l11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <rect x="7" y="5" width="3.5" height="14" rx="1" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}

export function SurahCard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayRef = useRef(false);
  const [surahNumber, setSurahNumber] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const surahName = SURAH_NAMES[surahNumber - 1] ?? "Al Fatihah";
  const progress =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setAudioError(true));
    } else {
      audio.pause();
    }
  };

  const changeSurah = (next: number) => {
    if (next === surahNumber) return;

    autoplayRef.current = playing;
    audioRef.current?.pause();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    setSurahNumber(next);
  };

  return (
    <div className="flex aspect-square h-full flex-col bg-white px-3 py-4 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      <div className="relative flex-1 overflow-hidden bg-[#F9F8F6] dark:bg-dark-secondary">
        <Waves
          lineColor={isDark ? "#282722" : "#ECE9E2"}
          accentColor={isDark ? "#383831" : "#DDD9D0"}
          spacing={10}
          amplitude={32}
          twist={1}
          speed={1}
          mouseRadius={175}
          mouseStrength={1}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] right-[7%] z-10 select-none font-surah text-[clamp(1.1rem,6.2cqw,1.65rem)] leading-none text-[#D8D4CB] dark:text-[#383831]"
        >
          {glyphFor(surahNumber)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={audioUrlFor(surahNumber)}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const value = event.currentTarget.duration;
          if (Number.isFinite(value) && value > 0) setDuration(value);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onCanPlay={(event) => {
          if (!autoplayRef.current) return;
          autoplayRef.current = false;
          void event.currentTarget.play().catch(() => {});
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          setCurrentTime(0);
          setPlaying(false);
        }}
        onError={() => {
          setPlaying(false);
          setAudioError(true);
        }}
        className="hidden"
      />

      <div className="mt-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex min-w-0 items-center gap-1">
              <p className="truncate text-[clamp(12px,4.4cqw,14px)] font-medium leading-tight">
                {surahName}
              </p>
              <Icon
                name="chevronDown"
                className="h-3 w-3 shrink-0 text-ink-mute dark:text-dark-ink-mute"
              />
              <select
                aria-label="Surah"
                value={surahNumber}
                onChange={(event) => changeSurah(Number(event.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 opacity-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
              >
                {SURAH_NAMES.map((name, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}. {name}
                  </option>
                ))}
              </select>
            </div>
            <span className="shrink-0 text-[9px] tabular-nums text-ink-mute dark:text-dark-ink-mute">
              {audioError
                ? "Audio unavailable"
                : `${formatDuration(currentTime)} / ${formatDuration(duration)}`}
            </span>
          </div>
          <div className="mt-1 h-[3px] overflow-hidden bg-[#E9E6DF] dark:bg-dark-border">
            <div
              className="h-full bg-primary transition-[width] duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={toggleAudio}
          disabled={audioError}
          aria-label={
            playing ? `Pause ${surahName}` : `Play ${surahName}`
          }
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform active:scale-95 disabled:cursor-default disabled:opacity-40 dark:bg-dark-ink dark:text-dark-bg"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

import { StoreBadges } from "./StoreBadges";

export function DownloadCTA() {
  return (
    <section id="download" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <img
          src="/icons/app-icon.png"
          alt="Qawwam app icon"
          className="mx-auto h-12 w-12 rounded-[16px] shadow-xl"
        />
        <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Faith, together.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft dark:text-dark-ink-soft sm:text-lg">
          Download Qawwam for free and bring prayer times, the Qur'an, duas,
          tasbih — and the people who keep you accountable — together,
          everywhere you go.
        </p>

        <div className="mt-10 flex justify-center">
          <StoreBadges />
        </div>
      </div>
    </section>
  );
}

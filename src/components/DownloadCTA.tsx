import { Icon } from "./Icon";
import { PLAY_STORE_URL } from "../data/site";

export function DownloadCTA() {
  return (
    <section
      id="download"
      className="scroll-mt-24 border-t border-border py-24 dark:border-dark-border sm:py-36"
    >
      <div className="mx-auto max-w-3xl px-5 text-center">
        <img
          src="/icons/logo.png"
          alt="Qawwam"
          className="mx-auto h-10 w-auto dark:hidden"
        />
        <img
          src="/icons/logo-white.png"
          alt="Qawwam"
          className="mx-auto hidden h-10 w-auto dark:block"
        />

        <h2 className="mt-10 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.045em]">
          Faith, together.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft">
          Download Qawwam for free and bring prayer times, the Qur'an, duas,
          tasbih — and the people who keep you accountable — together,
          everywhere you go.
        </p>

        <div className="mt-10 flex flex-col items-center">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-80 dark:bg-dark-ink dark:text-dark-bg"
          >
            Download for Android
            <Icon
              name="arrowRight"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <p className="mt-4 text-xs text-ink-mute dark:text-dark-ink-mute">
            Free · App Store coming soon
          </p>
        </div>
      </div>
    </section>
  );
}

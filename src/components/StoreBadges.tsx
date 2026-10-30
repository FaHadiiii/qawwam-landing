export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href="https://play.google.com/store/apps/details?id=com.qawwam.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded-md border border-border px-3 py-1.5 transition-colors hover:border-ink/40 dark:border-dark-border dark:hover:border-dark-ink/40"
      >
        <img
          src="/icons/playstore.png"
          alt="Google Play logo"
          className="h-5 w-5 object-contain"
        />
        <span className="ml-2 flex flex-col items-start leading-none">
          <span className="text-[9px] tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Get it on
          </span>
          <span className="mt-0.5 text-[13px] font-medium">Google Play</span>
        </span>
      </a>

      <span
        title="App Store version coming soon"
        className="flex cursor-not-allowed items-center rounded-md border border-border px-3 py-1.5 opacity-50 dark:border-dark-border"
      >
        <img
          src="/icons/applestore.png"
          alt="Apple logo"
          className="h-5 w-5 object-contain grayscale"
        />
        <span className="ml-2 flex flex-col items-start leading-none">
          <span className="text-[9px] tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Download on the
          </span>
          <span className="mt-0.5 text-[13px] font-medium">App Store</span>
        </span>
      </span>
    </div>
  );
}

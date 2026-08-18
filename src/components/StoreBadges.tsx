export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Google Play Store (Active) */}
      <a
        href="https://play.google.com/store/apps/details?id=com.qawwam.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded-lg border border-border bg-surface p-1 pl-2.5 pr-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition hover:shadow-md dark:border-dark-border dark:bg-dark-surface"
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
          <span className="mt-0.5 text-sm font-semibold">Google Play</span>
        </span>
      </a>

      {/* App Store (Coming Soon - Greyed Out) */}
      <span
        title="App Store version coming soon"
        className="flex cursor-not-allowed items-center rounded-lg border border-border bg-surface/50 p-1 pl-2.5 pr-4 opacity-50 shadow-[0_1px_4px_rgba(0,0,0,0.05)] dark:border-dark-border dark:bg-dark-surface/50"
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
          <span className="mt-0.5 text-sm font-semibold">App Store</span>
        </span>
      </span>
    </div>
  );
}

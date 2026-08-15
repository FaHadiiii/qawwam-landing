export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="flex items-center rounded-xl border border-border bg-surface p-1.5 pl-3 pr-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] dark:border-dark-border dark:bg-dark-surface">
        <img
          src="/icons/applestore.png"
          alt="Apple logo"
          className="h-6 w-6 object-contain"
        />
        <span className="ml-3 flex flex-col items-start leading-none">
          <span className="text-[10px] tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Download on the
          </span>
          <span className="text-base font-semibold">App Store</span>
        </span>
      </span>
      <span className="flex items-center rounded-xl border border-border bg-surface p-1.5 pl-3 pr-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)] dark:border-dark-border dark:bg-dark-surface">
        <img
          src="/icons/playstore.png"
          alt="Google Play logo"
          className="h-6 w-6 object-contain"
        />
        <span className="ml-3 flex flex-col items-start leading-none">
          <span className="text-[10px] tracking-wide text-ink-soft dark:text-dark-ink-soft">
            Get it on
          </span>
          <span className="text-base font-semibold">Google Play</span>
        </span>
      </span>
    </div>
  );
}

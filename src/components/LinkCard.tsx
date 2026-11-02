const AVATARS = [
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    alt: "User avatar 1",
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    alt: "User avatar 2",
  },
  {
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    alt: "User avatar 3",
  },
] as const;

export function LinkCard() {
  return (
    <div className="relative flex aspect-square h-full flex-col items-center justify-center bg-white p-6 shadow-[0_1px_4px_rgba(23,22,15,0.08)] [container-type:inline-size] sm:p-7 dark:bg-dark-surface dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {/* Centered two-toned text */}
      <div className="text-center">
        <p className="text-[clamp(1.2rem,5.6cqw,1.7rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink dark:text-dark-ink">
          <span>Link your worship with</span>
          <br />
          <span className="text-[#55524d] dark:text-[#a09d94]">people </span>
          <span className="text-[#9c9898] dark:text-[#767369]">who matter</span>
        </p>
      </div>

      {/* Stacked avatars component */}
      <div
        className="mt-9 flex items-center justify-center -space-x-2.5 sm:mt-11"
        aria-label="Connected users"
      >
        {AVATARS.map((avatar, idx) => (
          <div
            key={idx}
            className="relative h-8 w-8 overflow-hidden rounded-full bg-secondary ring-2 ring-white shadow-xs sm:h-9 sm:w-9 dark:bg-dark-secondary dark:ring-dark-surface"
          >
            <img
              src={avatar.url}
              alt={avatar.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

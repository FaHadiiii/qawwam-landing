import { useIsMobile, useReveal } from "../lib/motion";
import { Icon } from "./Icon";
import { DeviceFrame } from "./DeviceFrame";

const STEPS = [
  {
    icon: "link" as const,
    title: "Link",
    body: "Connect with family and friends.",
  },
  {
    icon: "check" as const,
    title: "Share",
    body: "Share exactly what you choose.",
  },
  {
    icon: "heart" as const,
    title: "Grow",
    body: "Stay accountable with gentle pokes.",
  },
];

export function ConnectionSection() {
  const headingRef = useReveal<HTMLHeadingElement>(0.1);
  const subRef = useReveal<HTMLParagraphElement>(0.1);
  const stepsRef = useReveal<HTMLDivElement>(0.1);
  const phonesRef = useReveal<HTMLDivElement>(0.1);
  const privacyRef = useReveal<HTMLParagraphElement>(0.1);
  const isMobile = useIsMobile();

  return (
    <section
      id="connect"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-5">
        {/* Headline */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            ref={headingRef}
            className="reveal text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl"
          >
            Worship is personal.{" "}
            <span className="bg-gradient-to-r from-primary to-[#5b8def] bg-clip-text text-transparent">
              Never lonely.
            </span>
          </h2>

          <p
            ref={subRef}
            className="reveal mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-soft dark:text-dark-ink-soft"
            style={{ transitionDelay: "80ms" }}
          >
            Qawwam is built around connection — link your worship with the
            people who matter.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="reveal mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-3"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Icon name={step.icon} className="mx-auto h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-ink-soft dark:text-dark-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Phones + animated connection line */}
        <div
          ref={phonesRef}
          className="reveal mx-auto mt-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10"
        >
          <DeviceFrame
            name="account_link"
            alt="Qawwam linked accounts"
            width={isMobile ? 175 : 230}
          />
          <div className="flex flex-none items-center justify-center sm:px-8">
            {/* Vertical line on mobile */}
            <svg viewBox="0 0 4 80" className="h-14 w-1.5 sm:hidden">
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="80"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-dash text-primary"
              />
            </svg>
            {/* Horizontal line on desktop */}
            <svg viewBox="0 0 80 4" className="hidden h-1.5 w-24 sm:block">
              <line
                x1="0"
                y1="2"
                x2="80"
                y2="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-dash text-primary"
              />
            </svg>
          </div>
          <DeviceFrame
            name="account_link_analytic"
            alt="Qawwam shared analytics view"
            width={isMobile ? 175 : 230}
          />
        </div>

        {/* Privacy line */}
        <p
          ref={privacyRef}
          className="reveal mx-auto mt-16 flex w-fit items-center gap-2 text-sm font-medium text-ink-soft dark:text-dark-ink-soft"
        >
          <Icon name="check" className="h-4 w-4 flex-none text-primary" />
          Private by design — you decide what's shared.
        </p>
      </div>
    </section>
  );
}

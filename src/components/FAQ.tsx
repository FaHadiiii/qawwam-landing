import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

const FAQS = [
  {
    q: "Is Qawwam free?",
    a: "Yes. Qawwam is free to download and use. We're committed to keeping the core experience free so everyone can benefit.",
  },
  {
    q: "Does Qawwam work offline?",
    a: "For the most part, yes. The Qur'an with its translations and your bookmarks, duas, tasbih and personal records are available offline and sync automatically when you reconnect.",
  },
  {
    q: "Which languages are supported?",
    a: "Qawwam is fully localised in English, Bahasa Malaysia and Arabic — including the Qur'an translations and duas.",
  },
  {
    q: "Where do prayer times come from?",
    a: "Prayer times are sourced from official national religious authorities where available — such as JAKIM, Kemenag, MUIS and KHEU — and otherwise computed using reliable astronomical calculations.",
  },
  {
    q: "Is my data private?",
    a: "Your account data is synced securely and is never sold. You can delete your account and data at any time. See our Privacy Policy for full details.",
  },
  {
    q: "Which devices are supported?",
    a: "Qawwam runs on iPhone and Android phones and tablets. It's optimised for both light and dark mode.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base text-ink-soft dark:text-dark-ink-soft">
            Everything you might want to know before downloading.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-card border border-border bg-surface transition dark:border-dark-border dark:bg-dark-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full bg-secondary text-ink-soft transition-transform duration-300 dark:bg-dark-secondary dark:text-dark-ink-soft ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <Icon name="chevronDown" className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft dark:text-dark-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-ink-soft dark:text-dark-ink-soft">
          Something else on your mind? Read our{" "}
          <Link
            to="/privacy"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Terms of Use
          </Link>
          , or reach out through the app.
        </p>
      </div>
    </section>
  );
}

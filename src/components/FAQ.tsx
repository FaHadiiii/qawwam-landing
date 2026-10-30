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
    q: "How do linked accounts work?",
    a: "Create a profile code in the app, then share it with family or friends. Once they connect, you can grant each other access to chosen analytics — prayer, fasting, Qur'an reading or menstrual — and send gentle pokes to stay accountable.",
  },
  {
    q: "Is my data private?",
    a: "Your account data is synced securely and is never sold. Sharing is always opt-in: you decide exactly which analytics a linked account can see, and you can revoke access or delete your account and data at any time. See our Privacy Policy for full details.",
  },
  {
    q: "Which devices are supported?",
    a: "Qawwam runs on iPhone and Android phones and tablets. It's optimised for both light and dark mode.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-border py-20 dark:border-dark-border sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-mute dark:text-dark-ink-mute">
              Questions
            </p>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.04em]">
              Frequently asked.
            </h2>
            <p className="mt-6 max-w-xs text-[15px] leading-7 text-ink-soft dark:text-dark-ink-soft">
              Something else on your mind? Read our{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-2 hover:text-ink dark:hover:text-dark-ink"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                to="/terms"
                className="underline underline-offset-2 hover:text-ink dark:hover:text-dark-ink"
              >
                Terms of Use
              </Link>
              , or reach out through the app.
            </p>
          </div>

          <div>
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="border-b border-border first:border-t dark:border-dark-border"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-medium">{faq.q}</span>
                    <Icon
                      name="plus"
                      className={`h-4 w-4 flex-none text-ink-mute transition-transform duration-300 dark:text-dark-ink-mute ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-5 text-sm leading-7 text-ink-soft dark:text-dark-ink-soft">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

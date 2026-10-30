import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

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
    <section id="faq" className="scroll-mt-24 py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <Reveal className="text-center lg:text-left">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em]">
              Frequently
              <br />
              <span className="text-ink-soft dark:text-dark-ink-soft">
                asked.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xs text-[15px] leading-7 text-ink-soft lg:mx-0 dark:text-dark-ink-soft">
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
              </Link>.
            </p>
          </Reveal>

          <div>
            {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                    <p className="max-w-2xl pb-5 text-sm leading-7 text-ink-soft dark:text-dark-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

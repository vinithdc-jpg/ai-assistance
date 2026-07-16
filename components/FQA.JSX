"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    question: "How does the AI agent learn our product?",
    answer:
      "Connect your help center, past tickets, and internal docs during onboarding. The agent indexes them and keeps itself updated as your content changes.",
  },
  {
    question: "What happens when it can't resolve a ticket?",
    answer:
      "It escalates to your team with full context — the conversation history, customer details, and what it already tried — so no one repeats themselves.",
  },
  {
    question: "Can we control what the agent is allowed to do?",
    answer:
      "Yes. You set explicit guardrails for actions like refunds or account changes, and anything outside those rules routes to a human automatically.",
  },
  {
    question: "Is our customer data secure?",
    answer:
      "All data is encrypted in transit and at rest, and you can choose regional data residency to meet your compliance requirements.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20">
      <div className="container-page mx-auto max-w-2xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            Common Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-line rounded-xl2 border border-line bg-white shadow-card">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-display text-sm font-semibold text-ink sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line text-primary transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm text-muted">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

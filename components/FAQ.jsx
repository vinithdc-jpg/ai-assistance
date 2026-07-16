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
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">Common Questions</h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl2 border border-line bg-surface shadow-card">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="border-b last:border-b-0 border-line">
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-ink">{item.question}</span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border border-line text-xl font-medium transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: 'What types of projects do you take on?',
    answer:
      "I work on full-stack web applications, SaaS products, AI-powered tools, headless frontends, REST/GraphQL APIs, and performance-critical systems. If there's a complex engineering problem at the core, I'm interested.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A focused MVP or feature build typically takes 4–6 weeks. A full SaaS product from discovery to launch is usually 2–4 months. Every engagement starts with a scoping session so you get a clear, honest timeline before we begin.',
  },
  {
    question: 'Do you work with startups or established companies?',
    answer:
      "Both. I've worked with early-stage founders who needed fast, lean execution, and with growing companies that needed reliability, scale, and clean architecture. The approach adapts — the quality doesn't.",
  },
  {
    question: 'What does day-to-day collaboration look like?',
    answer:
      "You'll get regular progress updates, async-first communication, and a weekly sync call if needed. I write code that's clean and documented so your team can own it after handoff. No black boxes.",
  },
  {
    question: 'Do you offer support and maintenance after launch?',
    answer:
      'Yes. For products that need ongoing attention, I offer retainer-based engagements covering bug fixes, feature iterations, performance monitoring, and scaling support. Long-term relationships produce the best results.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted" id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Common <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={question}
                className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-up hover:border-primary/30 transition-colors duration-200"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground text-sm sm:text-base">
                    {question}
                  </span>
                  <span
                    className={`material-icons text-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Smooth grid-rows accordion — no max-height flicker */}
                <div
                  className="faq-accordion"
                  data-open={String(isOpen)}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

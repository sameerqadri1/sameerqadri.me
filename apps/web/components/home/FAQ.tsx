'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: 'What types of projects do you take on?',
    answer:
      'I engineer production web applications, SaaS platforms, headless e-commerce storefronts, and autonomous AI agents. If your product requires custom architecture, sub-second latency, or reliable LLM integrations, I can lead the build.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A focused MVP or headless migration typically ships in 4 to 6 weeks. Full-scale SaaS platforms from architecture to launch generally require 2 to 4 months. All work is scoped upfront with documented acceptance criteria.',
  },
  {
    question: 'Do you work with startups or established companies?',
    answer:
      'Both. I collaborate with early-stage founders needing rapid, high-leverage execution, as well as established organizations requiring scale, strict type contracts, and security hardening.',
  },
  {
    question: 'What does day-to-day collaboration look like?',
    answer:
      'Async-first communication, weekly milestone syncs, and direct access via Slack or Linear. Every feature is delivered with pull requests, automated checks, and clean documentation so your in-house team can easily maintain it.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. For production applications, I offer dedicated engineering retainers covering performance monitoring, security updates, and iterative feature development.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background scroll-mt-16" id="faq">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Context & Direct Consultation Prompt */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>engineering scope // SLAs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Clear details on delivery timelines, technical scope, communication cadences, and working arrangements.
              </p>
            </div>

            {/* Direct Consultation Box */}
            <div className="p-5 rounded-[10px] border border-border bg-card space-y-3">
              <h3 className="text-sm font-medium text-foreground">
                Have a different question or custom requirement?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send your system specifications or API schema. I review architectural feasibility and reply within 24 hours.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline group pt-1"
              >
                <span>Initiate project inquiry</span>
                <span className="material-icons text-sm transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Full-Width Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={question}
                  className="rounded-[10px] border border-border bg-card overflow-hidden transition-colors hover:border-accent/30"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-foreground text-sm sm:text-base pr-2">
                      {question}
                    </span>
                    <span
                      className={`material-icons text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-foreground' : ''
                      }`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </button>

                  <div
                    className="faq-accordion"
                    data-open={String(isOpen)}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pt-1 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/40">
                        {answer}
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

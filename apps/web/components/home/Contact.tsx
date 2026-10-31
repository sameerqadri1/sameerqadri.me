'use client';

import { useState } from 'react';
import { ContactForm, ContactSuccessView } from '@/components/ContactForm';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitterName, setSubmitterName] = useState('');

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background scroll-mt-16" id="contact">
      <div className="container mx-auto px-6">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Scope & Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-3">
                  Initiate a Project
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Have a system migration, headless build, or autonomous AI pipeline to engineer? Send an outline below. I review and respond within 24 hours.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:hello@sameerqadri.me"
                  className="flex items-center gap-3 p-3.5 rounded-[10px] border border-border bg-card hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent active:scale-[0.99]"
                >
                  <div className="w-9 h-9 rounded-[6px] border border-border bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                    <span className="material-icons text-base" aria-hidden="true">mail</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-muted-foreground">Email</h3>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      hello@sameerqadri.me
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-[10px] border border-border bg-card">
                  <div className="w-9 h-9 rounded-[6px] border border-border bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                    <span className="material-icons text-base" aria-hidden="true">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-muted-foreground">Response SLA</h3>
                    <p className="text-xs sm:text-sm font-medium text-accent">
                      Within 24 Hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[10px] border border-border/80 bg-muted/40 font-mono text-xs text-muted-foreground">
                <p className="text-foreground font-medium mb-1">Commercial Engagement</p>
                <p>Contract, milestone-based delivery, or monthly architecture retainers.</p>
              </div>
            </div>

            {/* Right Column: Form in Hairline Panel */}
            <div className="lg:col-span-7 rounded-[10px] border border-border bg-card p-6 sm:p-8">
              <ContactForm
                idPrefix="contact"
                showCompany
                showProjectDetails
                showCalendlyOnSuccess={false}
                onSubmitted={({ name }) => {
                  setSubmitterName(name);
                  setSubmitted(true);
                }}
                variant="default"
              />
            </div>

          </div>
        ) : (
          <ContactSuccessView name={submitterName} />
        )}
      </div>
    </section>
  );
}

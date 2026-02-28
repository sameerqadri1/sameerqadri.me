'use client';

import { useState } from 'react';
import { ContactForm, ContactSuccessView } from '@/components/ContactForm';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitterName, setSubmitterName] = useState('');

  return (
    <section className="py-24 bg-background" id="contact">
      <div className="container mx-auto px-6">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8 animate-fade-up">
              <div>
                <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
                  Contact
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Let&apos;s build something{' '}
                  <span className="text-gradient">extraordinary</span>.
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Have a project in mind? Fill in the details and I&apos;ll get
                back within 12 hours — then we&apos;ll book a call to dig into
                the specifics.
              </p>
              <div className="space-y-5">
                <a
                  href="mailto:sameerkhan8701@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors flex-shrink-0">
                    <span className="material-icons text-primary">mail</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">Email</h4>
                    <p className="text-muted-foreground text-sm">
                      sameerkhan8701@gmail.com
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors flex-shrink-0">
                    <span className="material-icons text-primary">
                      calendar_today
                    </span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">
                      Discovery Call
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      30-min intro session via Calendly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl relative shadow-sm animate-fade-up">
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Responds within 12h
              </div>
              <ContactForm
                idPrefix="contact"
                showCompany
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

'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
  website: string; // honeypot — must stay empty
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    message: '',
    website: '', // honeypot
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot — bots fill this, humans don't
    if (form.website) return;

    setLoading(true);
    setError(null);

    try {
      if (API_URL) {
        const res = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            company: form.company,
            email: form.email,
            message: form.message,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error?.message || 'Failed to send. Please try again.');
        }
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email me directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 bg-background" id="contact">
      <div className="container mx-auto px-6">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8 animate-fade-up">
              <div>
                <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — visually hidden, must be empty on submit */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                  tabIndex={-1}
                >
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      htmlFor="contact-name"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all text-sm"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      htmlFor="contact-company"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all text-sm"
                      placeholder="Acme Inc (optional)"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    htmlFor="contact-email"
                  >
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all text-sm"
                    placeholder="john@company.com"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    htmlFor="contact-message"
                  >
                    How can I help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all resize-none text-sm"
                    placeholder="Briefly describe your project..."
                    rows={4}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3" role="alert">
                    {error}
                  </p>
                )}

                <button
                  className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-icons text-sm animate-spin">sync</span>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message &amp; Book a Call
                      <span className="material-icons text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* animate-enter uses CSS keyframes — works without JS observer */
          <div className="animate-enter">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="material-icons text-primary text-3xl">
                  check_circle
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Message received!
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Thanks{form.name ? `, ${form.name}` : ''}. I&apos;ll be in
                touch within 12 hours. In the meantime, book a 30-minute
                discovery call below — let&apos;s talk through your project.
              </p>
            </div>
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border shadow-xl">
              <iframe
                src="https://calendly.com/sameerqadri/30min"
                width="100%"
                height="700"
                style={{ border: 0 }}
                title="Book a 30-minute call with Sameer Qadri"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

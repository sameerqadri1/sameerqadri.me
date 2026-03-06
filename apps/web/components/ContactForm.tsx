'use client';

import { useRef, useState, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const CALENDLY_URL = 'https://calendly.com/sameerqadri/30min';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

/** Success view with thank-you message and Calendly iframe (for use when parent controls layout). */
export function ContactSuccessView({ name }: { name?: string }) {
  return (
    <div className="animate-enter">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="material-icons text-primary text-3xl" aria-hidden>
            check_circle
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Message received!
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Thanks{name ? `, ${name}` : ''}. I&apos;ll be in touch within 12 hours. In the meantime, book a 30-minute
          discovery call below — let&apos;s talk through your project.
        </p>
      </div>
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border shadow-xl">
        <iframe
          src={CALENDLY_URL}
          width="100%"
          height="700"
          style={{ border: 0 }}
          title="Book a 30-minute call with Sameer Qadri"
        />
      </div>
    </div>
  );
}

interface ContactFormProps {
  /** Prefix for input ids to avoid collisions when multiple forms on page */
  idPrefix?: string;
  /** Show company field (home contact: true, CTA: false) */
  showCompany?: boolean;
  /** Show extra project detail fields (type, timeline, budget, stage) */
  showProjectDetails?: boolean;
  /** Show success message + Calendly iframe after submit (ignored if onSubmitted is set) */
  showCalendlyOnSuccess?: boolean;
  /** When set, parent controls success view; form calls this on success and does not show success UI */
  onSubmitted?: (data: { name: string }) => void;
  /** Submit button label */
  submitLabel?: string;
  /** 'default' = full styling; 'compact' = reduced spacing, simpler labels */
  variant?: 'default' | 'compact';
  className?: string;
}

const defaultLabelClass = 'text-xs font-bold uppercase tracking-widest text-muted-foreground';
const compactLabelClass = 'block text-sm font-medium text-muted-foreground mb-1';
const defaultInputClass =
  'w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';
const compactInputClass =
  'w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-sm';

export function ContactForm({
  idPrefix = 'contact',
  showCompany = true,
  showProjectDetails = false,
  showCalendlyOnSuccess = true,
  onSubmitted,
  submitLabel = 'Send Message & Book a Call',
  variant = 'default',
  className = '',
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [projectType, setProjectType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const isCompact = variant === 'compact';
  const labelClass = isCompact ? compactLabelClass : defaultLabelClass;
  const inputClass = isCompact ? compactInputClass : defaultInputClass;
  const spaceY = isCompact ? 'space-y-4' : 'space-y-5';

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name: n, value } = e.target;
    if (n === 'name') setName(value);
    else if (n === 'company') setCompany(value);
    else if (n === 'email') setEmail(value);
    else if (n === 'message') setMessage(value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let recaptchaToken: string | null = null;
      if (RECAPTCHA_SITE_KEY && recaptchaRef.current) {
        recaptchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
      }

      if (API_URL) {
        const res = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            company: showCompany ? company : '',
            email,
            message,
                projectType: showProjectDetails ? projectType : undefined,
                timeline: showProjectDetails ? timeline : undefined,
                budgetRange: showProjectDetails ? budgetRange : undefined,
                projectStage: showProjectDetails ? projectStage : undefined,
            recaptchaToken,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { error?: { message?: string } })?.error?.message || 'Failed to send. Please try again.');
        }
      }
      if (onSubmitted) {
        onSubmitted({ name });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted && showCalendlyOnSuccess && !onSubmitted) {
    return (
      <div className={className}>
        <ContactSuccessView name={name} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${spaceY} ${className}`}>
      {RECAPTCHA_SITE_KEY && (
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          size="invisible"
        />
      )}

      <div className={showCompany && !isCompact ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : ''}>
        <div className={isCompact ? '' : 'space-y-2'}>
          <label className={labelClass} htmlFor={`${idPrefix}-name`}>
            {isCompact ? 'Name' : 'Your Name'}
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            value={name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder={isCompact ? undefined : 'John Doe'}
            type="text"
            autoComplete="name"
          />
        </div>
        {showCompany && (
          <div className={isCompact ? '' : 'space-y-2'}>
            <label className={labelClass} htmlFor={`${idPrefix}-company`}>
              Company
            </label>
            <input
              id={`${idPrefix}-company`}
              name="company"
              value={company}
              onChange={handleChange}
              className={inputClass}
              placeholder={isCompact ? undefined : 'Acme Inc (optional)'}
              type="text"
              autoComplete="organization"
            />
          </div>
        )}
      </div>

      <div className={isCompact ? '' : 'space-y-2'}>
        <label className={labelClass} htmlFor={`${idPrefix}-email`}>
          {isCompact ? 'Email' : 'Work Email'}
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder={isCompact ? undefined : 'john@company.com'}
          autoComplete="email"
        />
      </div>

      {showProjectDetails && (
        <div
          className={
            isCompact
              ? 'space-y-3'
              : 'mt-2 rounded-2xl border border-border/60 bg-card/40 px-4 py-4 space-y-4'
          }
        >
          {!isCompact && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Project details
              </p>
              <p className="text-xs text-muted-foreground/80">
                Optional, but helps make the first call more concrete.
              </p>
            </div>
          )}
          <div className={isCompact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
            <div className={isCompact ? '' : 'space-y-2'}>
              <label className={labelClass} htmlFor={`${idPrefix}-project-type`}>
                Project type
              </label>
              <select
                id={`${idPrefix}-project-type`}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className={inputClass}
              >
                <option value="">Select (optional)</option>
                <option value="new_build">New build</option>
                <option value="rebuild_migration">Rebuild / migration</option>
                <option value="ai_automation">AI agent / automation</option>
                <option value="saas_platform">SaaS product / platform</option>
                <option value="performance_audit">Performance audit</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={isCompact ? '' : 'space-y-2'}>
              <label className={labelClass} htmlFor={`${idPrefix}-timeline`}>
                Timeline
              </label>
              <select
                id={`${idPrefix}-timeline`}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={inputClass}
              >
                <option value="">Select (optional)</option>
                <option value="asap">ASAP (0–4 weeks)</option>
                <option value="1_3_months">1–3 months</option>
                <option value="3_6_months">3–6 months</option>
                <option value="not_sure">Not sure yet</option>
              </select>
            </div>
            <div className={isCompact ? '' : 'space-y-2'}>
              <label className={labelClass} htmlFor={`${idPrefix}-budget`}>
                Budget range
              </label>
              <select
                id={`${idPrefix}-budget`}
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className={inputClass}
              >
                <option value="">Select (optional)</option>
                <option value="<2k">&lt; $2k</option>
                <option value="2k_5k">$2k–$5k</option>
                <option value="5k_10k">$5k–$10k</option>
                <option value="10k_plus">$10k+</option>
                <option value="not_sure">Not sure</option>
              </select>
            </div>
            <div className={isCompact ? '' : 'space-y-2'}>
              <label className={labelClass} htmlFor={`${idPrefix}-stage`}>
                Current stage
              </label>
              <select
                id={`${idPrefix}-stage`}
                value={projectStage}
                onChange={(e) => setProjectStage(e.target.value)}
                className={inputClass}
              >
                <option value="">Select (optional)</option>
                <option value="idea_only">Idea only</option>
                <option value="designs_ready">Wireframes / designs ready</option>
                <option value="existing_product">Existing product live</option>
                <option value="scaling_refactor">Scaling / refactor</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className={isCompact ? '' : 'space-y-2'}>
        <label className={labelClass} htmlFor={`${idPrefix}-message`}>
          {isCompact ? 'Message' : 'How can I help?'}
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          value={message}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder={isCompact ? undefined : 'Briefly describe your project...'}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {loading ? (
          <>
            <span className="material-icons text-sm animate-spin" aria-hidden>sync</span>
            Sending…
          </>
        ) : (
          <>
            {submitLabel}
            <span className="material-icons text-sm" aria-hidden>send</span>
          </>
        )}
      </button>
    </form>
  );
}

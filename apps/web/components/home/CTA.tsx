import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

export function CTA() {
  return (
    <Section id="contact" className="border-t border-white/10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-text)] md:text-3xl">
          Let&apos;s work together
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-muted)]">
          Have a project in mind? Get in touch and we can make it happen.
        </p>
        <Button href="mailto:hello@sameerqadri.me" className="mt-8">
          Contact me
        </Button>
      </div>
    </Section>
  );
}

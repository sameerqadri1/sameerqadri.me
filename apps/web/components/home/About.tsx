import { Section } from '@/components/Section';

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold text-[var(--color-text)] md:text-3xl">
          About
        </h2>
        <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">
          I design and build digital products with a focus on clarity and
          impact. This site showcases selected case studies and projects.
        </p>
      </div>
    </Section>
  );
}

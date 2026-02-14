import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

export function Hero() {
  return (
    <Section id="hero" className="pt-24 md:pt-32">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m Sameer Qadri
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Building products and experiences that matter. Explore my work and
          case studies below.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#featured">View work</Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </div>
    </Section>
  );
}

import Link from 'next/link';
import { Section } from '@/components/Section';

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pt-24">
        <h1 className="text-3xl font-semibold text-[var(--color-text)]">
          Case studies
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          All projects and case studies. Featured work is on the homepage.
        </p>
        <p className="mt-8 text-[var(--color-text-muted)]">
          List is loaded client-side from the API. Add case studies via the
          admin panel.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-[var(--color-accent)] hover:underline"
        >
          ← Back to home
        </Link>
      </Section>
    </>
  );
}

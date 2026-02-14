'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import type { CaseStudy } from '@portfolio/shared';

interface ApiResponse {
  success: boolean;
  data?: CaseStudy[];
  pagination?: { total: number };
}

export function FeaturedCaseStudies() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (!apiUrl) {
      setLoading(false);
      return;
    }
    fetch(`${apiUrl}/api/case-studies?published=true&featured=true&limit=6`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((json) => {
        if (json.success && json.data) setItems(json.data);
      })
      .catch(() => setError('Failed to load case studies'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section id="featured">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] md:text-3xl">
        Featured work
      </h2>
      <p className="mt-2 text-[var(--color-text-muted)]">
        A selection of recent projects and case studies.
      </p>

      {loading && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl bg-[var(--color-bg-elevated)]"
              aria-hidden
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-10 text-[var(--color-text-muted)]" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((study) => (
            <Link key={study.id} href={`/case-studies/${study.slug}/`}>
              <Card
                as="article"
                title={study.title}
                subtitle={study.subtitle ?? study.summary.slice(0, 80) + '…'}
              >
                {study.coverImageUrl && (
                  <img
                    src={study.coverImageUrl}
                    alt=""
                    className="mb-4 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                  {study.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="mt-10 text-[var(--color-text-muted)]">
          No featured case studies yet. Check back soon.
        </p>
      )}

      <div className="mt-10">
        <Button href="/case-studies/" variant="secondary">
          View all case studies
        </Button>
      </div>
    </Section>
  );
}

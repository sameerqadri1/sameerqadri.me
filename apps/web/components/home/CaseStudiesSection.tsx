'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import type { CaseStudy, CaseStudyListResponse } from '@/lib/types';

export function CaseStudiesSection() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (!apiUrl) {
      setLoading(false);
      return;
    }
    fetch(`${apiUrl}/api/case-studies?published=true&featured=true&limit=6`)
      .then((res) => res.json() as Promise<CaseStudyListResponse>)
      .then((json) => {
        if (json.success && json.data) setItems(json.data);
      })
      .catch(() => setError('Failed to load case studies'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="py-20 md:py-24 border-b border-border bg-background" id="projects">
        <div className="container mx-auto px-6">

          {/* Section head block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-2">
                Selected Case Studies
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                Verified production outcomes across headless e-commerce, LLM agent pipelines, and full-stack software.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline shrink-0"
            >
              <span>View all records</span>
              <span className="material-icons text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[10px] border border-border bg-card p-6 animate-pulse"
                >
                  <div className="aspect-video bg-muted rounded-[6px] mb-4" />
                  <div className="h-4 w-1/3 bg-muted rounded mb-2" />
                  <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <p className="text-sm font-mono text-muted-foreground" role="alert">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No case studies published yet.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setActiveSlug(study.slug)}
                  className="group text-left rounded-[10px] border border-border bg-card hover:bg-muted/40 transition-colors p-5 sm:p-6 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <div>
                    {/* Visual / Cover preview */}
                    {study.coverImageUrl ? (
                      <div className="relative aspect-video rounded-[6px] overflow-hidden border border-border mb-4 bg-muted">
                        <img
                          alt={study.title}
                          src={study.coverImageUrl}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          decoding="async"
                          className="w-full h-full object-cover grayscale contrast-110"
                        />
                      </div>
                    ) : null}

                    {/* Meta tag */}
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-2">
                      <span>{study.client || 'Client System'}</span>
                      <span>{study.year || '2024'}</span>
                    </div>

                    <h3 className="text-lg font-medium text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors">
                      {study.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {study.summary}
                    </p>
                  </div>

                  {/* Tags & Action */}
                  <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {(study.tags || []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                      <span>Inspect</span>
                      <span className="material-icons text-sm" aria-hidden="true">arrow_forward</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {activeSlug && (
        <CaseStudyModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
      )}
    </>
  );
}

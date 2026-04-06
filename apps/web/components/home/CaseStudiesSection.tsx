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
      <section className="py-24" id="projects">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Section header */}
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-end md:text-left gap-6 mb-16 animate-fade-up">
            <div className="min-w-0">
              <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3">
                Work
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Case Studies
              </h2>
            </div>
            {/* Desktop: button sits in the header row */}
            <Link
              href="/case-studies"
              className="hidden md:inline-flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted/60 hover:border-primary/30 transition-all"
            >
              View all case studies
              <span className="material-icons text-base text-primary">arrow_forward</span>
            </Link>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-card/40 border border-border/60 overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-muted/60" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/3 bg-muted rounded" />
                    <div className="h-5 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-5/6 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <p className="mt-10 text-muted-foreground" role="alert">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="mt-10 text-muted-foreground">
              No case studies yet. Check back soon.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setActiveSlug(study.slug)}
                  className="group cursor-pointer animate-enter text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
                  style={{ animationDelay: `${Math.min(index * 0.07, 0.35)}s` }}
                >
                  <div className="h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-0.5">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {study.coverImageUrl ? (
                        <img
                          alt={study.title}
                          src={study.coverImageUrl}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="material-icons text-muted-foreground/30 text-5xl">
                            image
                          </span>
                        </div>
                      )}
                      {/* Tags strip on image */}
                      {(study.tags?.length ?? 0) > 0 && (
                        <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 flex-wrap">
                          {(study.tags || []).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm text-foreground text-[10px] font-semibold border border-border/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="p-5">
                      <p className="text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5">
                        {study.client || 'Case Study'}
                      </p>
                      <h3 className="text-base font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {study.summary}
                      </p>
                      <p className="mt-3 text-primary text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read case study
                        <span className="material-icons text-sm">arrow_forward</span>
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile/tablet: button below the grid */}
            <div className="mt-10 flex justify-center md:hidden animate-enter">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted/60 hover:border-primary/30 active:scale-[0.97] transition-all"
              >
                View all case studies
                <span className="material-icons text-base text-primary">arrow_forward</span>
              </Link>
            </div>
            </>
          )}
        </div>
      </section>

      {activeSlug && (
        <CaseStudyModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
      )}
    </>
  );
}

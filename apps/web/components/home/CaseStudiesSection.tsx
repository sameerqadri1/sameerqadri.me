'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudyModal } from '@/components/CaseStudyModal';

interface ApiResponse {
  success: boolean;
  data?: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    client?: string | null;
    coverImageUrl?: string | null;
  }[];
  pagination?: { total: number };
}

type CaseStudyItem = NonNullable<ApiResponse['data']>[number];

export function CaseStudiesSection() {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (!apiUrl) {
      setLoading(false);
      return;
    }
    fetch(`${apiUrl}/api/case-studies?published=true&featured=true&limit=3`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((json) => {
        if (json.success && json.data) setItems(json.data);
      })
      .catch(() => setError('Failed to load case studies'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="py-24" id="projects">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-fade-up">
            <div>
              <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">
                Work
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                Case Studies
              </h3>
            </div>
            <Link
              className="px-6 py-3 bg-secondary border border-border text-foreground rounded-lg hover:bg-secondary/70 transition-colors font-bold"
              href="/case-studies"
            >
              View All Case Studies
            </Link>
          </div>
          {loading && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-card/40 border border-border/60 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && !loading && (
            <p className="mt-10 text-muted-foreground" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && items && items.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setActiveSlug(study.slug)}
                  className="group cursor-pointer animate-fade-up text-left"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="rounded-2xl overflow-hidden border border-border/70 bg-card mb-6 relative shadow-sm">
                    {study.coverImageUrl ? (
                      <img
                        alt={study.title}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        src={study.coverImageUrl}
                      />
                    ) : (
                      <div className="w-full aspect-video bg-muted flex items-center justify-center">
                        <span className="material-icons text-muted-foreground/40 text-5xl">
                          image
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-bold flex items-center gap-2">
                        View Case Study
                        <span className="material-icons text-sm">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                    {study.client || 'Case Study'}
                  </p>
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {study.summary}
                  </p>
                </button>
              ))}
            </div>
          )}

          {!loading && !error && items && items.length === 0 && (
            <p className="mt-10 text-muted-foreground">
              No case studies yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {activeSlug && (
        <CaseStudyModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
      )}
    </>
  );
}

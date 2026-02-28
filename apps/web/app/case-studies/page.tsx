'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { CaseStudyModal } from '@/components/CaseStudyModal';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  summary: string;
  client?: string | null;
  coverImageUrl?: string | null;
}

interface ApiResponse {
  success: boolean;
  data?: CaseStudy[];
  pagination?: { total: number };
}

export default function CaseStudiesPage() {
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
    fetch(`${apiUrl}/api/case-studies?published=true`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((json) => {
        if (json.success && json.data) setItems(json.data);
      })
      .catch(() => setError('Failed to load case studies'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 animate-fade-up">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <span className="material-icons text-base">arrow_back</span>
              Back to home
            </Link>
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">
              Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Case Studies
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A full collection of projects I&apos;ve shipped — from SaaS
              platforms to AI-powered systems.
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-card/40 border border-border/60 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && !loading && (
            <p className="text-muted-foreground" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="text-center py-24">
              <span className="material-icons text-primary/30 text-6xl mb-4 block">
                folder_open
              </span>
              <p className="text-muted-foreground text-lg">
                No case studies yet. Check back soon.
              </p>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setActiveSlug(study.slug)}
                  className="group cursor-pointer animate-enter text-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="rounded-2xl overflow-hidden border border-border/70 bg-card mb-4 relative shadow-sm">
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
                      <span className="text-white font-bold flex items-center gap-2 text-sm">
                        View Case Study
                        <span className="material-icons text-sm">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                    {study.client || 'Case Study'}
                  </p>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {study.summary}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {activeSlug && (
        <CaseStudyModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
      )}
    </>
  );
}

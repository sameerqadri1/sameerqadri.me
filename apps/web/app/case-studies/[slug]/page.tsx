'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Required for `output: 'export'` — pages are rendered fully client-side.
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function generateStaticParams() {
  return [];
}
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string | null;
  client?: string | null;
  coverImageUrl?: string | null;
  tags?: string[];
  publishedAt?: string | null;
}

interface ApiResponse {
  success: boolean;
  data?: CaseStudy;
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (!apiUrl || !slug) {
      setLoading(false);
      return;
    }
    fetch(`${apiUrl}/api/case-studies/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json() as Promise<ApiResponse>;
      })
      .then((json) => {
        if (json.success && json.data) setStudy(json.data);
        else throw new Error('Not found');
      })
      .catch(() => setError('Case study not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <span className="material-icons text-base">arrow_back</span>
            All Case Studies
          </Link>

          {loading && (
            <div className="space-y-6 animate-pulse">
              <div className="h-10 w-2/3 bg-card rounded-xl" />
              <div className="h-5 w-1/3 bg-card rounded-xl" />
              <div className="h-80 w-full bg-card rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-card rounded-lg" />
                <div className="h-4 bg-card rounded-lg w-5/6" />
                <div className="h-4 bg-card rounded-lg w-4/6" />
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-24">
              <span className="material-icons text-muted-foreground/30 text-6xl mb-4 block">
                search_off
              </span>
              <p className="text-muted-foreground text-lg mb-6">{error}</p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                <span className="material-icons text-sm">arrow_back</span>
                View all case studies
              </Link>
            </div>
          )}

          {!loading && !error && study && (
            <article className="animate-fade-up">
              <header className="mb-10">
                {study.client && (
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    {study.client}
                  </p>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                  {study.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {study.summary}
                </p>
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {study.coverImageUrl && (
                <div className="mb-12 rounded-2xl overflow-hidden border border-border/60 shadow-xl">
                  <img
                    src={study.coverImageUrl}
                    alt={study.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}

              {study.content && (
                <div
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: study.content }}
                />
              )}

              <div className="mt-16 pt-10 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <span className="material-icons text-base">arrow_back</span>
                  All Case Studies
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm shadow-lg shadow-primary/20"
                >
                  Start a similar project
                  <span className="material-icons text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useEffect, useState, useCallback } from 'react';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  summary: string;
  body: string;
  coverImageUrl?: string | null;
  tags?: string[];
  client?: string | null;
  year?: number | null;
}

interface Props {
  slug: string | null;
  onClose: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function formatBody(raw: string): string {
  const trimmed = raw.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;

  return trimmed
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export function CaseStudyModal({ slug, onClose }: Props) {
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !API_URL) return;
    setLoading(true);
    setError(null);
    setStudy(null);

    fetch(`${API_URL}/api/case-studies/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data) setStudy(json.data);
        else throw new Error('Not found');
      })
      .catch(() => setError('Failed to load case study.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!slug) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-enter"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl mx-4 my-8 sm:my-16 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl animate-enter">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-20 w-9 h-9 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <span className="material-icons text-lg">close</span>
        </button>

        {loading && (
          <div className="p-8 space-y-6">
            <div className="w-full aspect-video bg-muted rounded-xl animate-pulse" />
            <div className="h-8 w-2/3 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-1/3 bg-muted rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 bg-muted rounded-lg animate-pulse w-5/6" />
              <div className="h-4 bg-muted rounded-lg animate-pulse w-4/6" />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center">
            <span className="material-icons text-muted-foreground/30 text-5xl mb-4 block">
              search_off
            </span>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && study && (
          <div>
            {study.coverImageUrl && (
              <img
                src={study.coverImageUrl}
                alt={study.title}
                className="w-full aspect-video object-cover rounded-t-2xl"
              />
            )}

            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div>
                {study.client && (
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                    {study.client}
                    {study.year ? ` · ${study.year}` : ''}
                  </p>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {study.title}
                </h2>
                {study.subtitle && (
                  <p className="mt-2 text-muted-foreground text-lg">
                    {study.subtitle}
                  </p>
                )}
              </div>

              {/* Tags */}
              {study.tags && study.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

              {/* Summary */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {study.summary}
              </p>

              {/* Body */}
              {study.body && (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary border-t border-border pt-6">
                  <div
                    dangerouslySetInnerHTML={{ __html: formatBody(study.body) }}
                  />
                </div>
              )}

              {/* CTA */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
                >
                  <span className="material-icons text-base">arrow_back</span>
                  Back to projects
                </button>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm shadow-lg shadow-primary/20"
                >
                  Start a similar project
                  <span className="material-icons text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { CaseStudy } from '@/lib/types';

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
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

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
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Scroll modal content to top when opening or when slug/study changes
  useEffect(() => {
    if (scrollBodyRef.current) scrollBodyRef.current.scrollTop = 0;
  }, [slug, study]);

  if (!slug) return null;

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/case-studies/?open=${encodeURIComponent(slug)}`
    : `/case-studies/?open=${encodeURIComponent(slug)}`;

  async function handleShare() {
    setShareState('idle');
    try {
      const nav: any = typeof navigator !== 'undefined' ? navigator : null;
      if (nav?.share) {
        await nav.share({
          title: study?.title ? `${study.title} — Case Study` : 'Case Study',
          url: shareUrl,
        });
        return;
      }
      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(shareUrl);
        setShareState('copied');
        window.setTimeout(() => setShareState('idle'), 1600);
        return;
      }
      setShareState('error');
      window.setTimeout(() => setShareState('idle'), 2000);
    } catch {
      setShareState('error');
      window.setTimeout(() => setShareState('idle'), 2000);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-enter"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel: flex column so close button stays visible; only body scrolls */}
      <div className="relative z-10 flex w-full max-w-3xl max-h-[85vh] mx-4 my-8 sm:my-16 flex-col rounded-2xl border border-border bg-card shadow-2xl animate-enter overflow-hidden">
        {/* Header actions */}
        <div className="flex flex-none items-start justify-between gap-3 p-4 pb-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="h-9 px-3 rounded-full bg-background/80 backdrop-blur border border-border flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Share case study"
            >
              <span className="material-icons text-lg" aria-hidden>share</span>
              <span className="text-sm font-semibold">
                {shareState === 'copied'
                  ? 'Copied'
                  : shareState === 'error'
                    ? 'Copy failed'
                    : 'Share'}
              </span>
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3 rounded-full bg-background/80 backdrop-blur border border-border flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Open link
              <span className="material-icons text-base" aria-hidden>open_in_new</span>
            </a>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Close"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        </div>
        {/* Scrollable body */}
        <div ref={scrollBodyRef} className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 pt-2">
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
                <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
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
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
    </div>
  );
}

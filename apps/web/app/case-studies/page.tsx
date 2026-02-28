'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { ContactForm } from '@/components/ContactForm';
import type { CaseStudy, CaseStudyListResponse } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

type SortOption = 'newest' | 'oldest' | 'title';

function parseSort(s: string | null): SortOption {
  if (s === 'newest' || s === 'oldest' || s === 'title') return s;
  return 'newest';
}

function CaseStudiesPageFallback() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="max-w-2xl mb-16">
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Work</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">All Case Studies</h1>
            <p className="text-muted-foreground text-lg">Loading…</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-card/40 border border-border/60 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function CaseStudiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('newest');

  // Sync URL -> state (e.g. browser back, shared link)
  useEffect(() => {
    const tag = searchParams.get('tag');
    setSelectedTag(tag);
    setSort(parseSort(searchParams.get('sort')));
  }, [searchParams]);

  const fetchCaseStudies = useCallback(async () => {
    if (!API_URL) {
      setError('API not configured');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/case-studies?published=true&limit=100`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const json = (await res.json()) as CaseStudyListResponse;
      if (!res.ok) {
        setError(json.error?.message || `Request failed (${res.status})`);
        setItems([]);
        return;
      }
      if (json.success && Array.isArray(json.data)) {
        setItems(json.data);
      } else if (!json.success) {
        setError(json.error?.message || 'Failed to load');
        setItems([]);
      } else {
        setItems([]);
      }
    } catch (e) {
      setError('Failed to load case studies. Check your connection and try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const allTags = Array.from(
    new Set(items.flatMap((s) => s.tags || []).filter(Boolean))
  ).sort();

  const filteredItems = selectedTag
    ? items.filter((s) => (s.tags || []).includes(selectedTag))
    : items;

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'title') {
      return (a.title || '').localeCompare(b.title || '');
    }
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return sort === 'newest' ? dateB - dateA : dateA - dateB;
  });

  function updateUrl(tag: string | null, sortVal: SortOption) {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sortVal !== 'newest') params.set('sort', sortVal);
    const qs = params.toString();
    router.replace(qs ? `/case-studies?${qs}` : '/case-studies', { scroll: false });
  }

  function handleTagSelect(tag: string | null) {
    setSelectedTag(tag);
    updateUrl(tag, sort);
  }

  function handleSortChange(sortVal: SortOption) {
    setSort(sortVal);
    updateUrl(selectedTag, sortVal);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="max-w-2xl mb-16 animate-enter">
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              All Case Studies
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-3">
              A full collection of projects I&apos;ve shipped — from SaaS
              platforms to AI-powered systems.
            </p>
            <p className="text-muted-foreground/90 text-base">
              Real projects, real impact. Select a project to read the full story.
            </p>
          </header>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true" aria-live="polite">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-card/40 border border-border/60 animate-pulse"
                  aria-hidden
                />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-4 text-destructive" role="alert">
              <p className="font-medium">{error}</p>
              <p className="mt-1 text-sm opacity-90">Check the API URL and try again later.</p>
              <button
                type="button"
                onClick={fetchCaseStudies}
                className="mt-4 px-4 py-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="text-center py-24 max-w-lg mx-auto animate-enter">
              <span className="material-icons text-primary/30 text-6xl mb-4 block" aria-hidden>
                folder_open
              </span>
              <p className="text-muted-foreground text-lg mb-2">
                No published case studies showing.
              </p>
              <p className="text-muted-foreground/80 text-sm mb-4">
                The API returned 0 published items. In the admin panel, open each case study, check <strong className="text-foreground/80">Published</strong>, and click Save. Then click Retry below.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={fetchCaseStudies}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Retry
                </button>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-semibold text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Get in touch
                </a>
              </div>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <>
              <section className="animate-enter" aria-label="Filters and sort">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                  <p className="text-muted-foreground text-sm">
                    {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
                    {selectedTag && (
                      <span className="ml-2">
                        · <button
                          type="button"
                          onClick={() => handleTagSelect(null)}
                          className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                        >
                          Clear filter
                        </button>
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <label htmlFor="sort-case-studies" className="text-muted-foreground text-sm font-medium">
                      Sort:
                    </label>
                    <select
                      id="sort-case-studies"
                      value={sort}
                      onChange={(e) => handleSortChange(e.target.value as SortOption)}
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="title">A–Z</option>
                    </select>
                  </div>
                </div>

                {allTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by category">
                    <button
                      type="button"
                      onClick={() => handleTagSelect(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        !selectedTag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagSelect(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          selectedTag === tag
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {selectedTag && filteredItems.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl border border-border bg-card/50 animate-enter" role="status">
                    <p className="text-muted-foreground mb-2">
                      No projects with the &quot;{selectedTag}&quot; tag.
                    </p>
                        <button
                          type="button"
                          onClick={() => handleTagSelect(null)}
                          className="text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                        >
                          Clear filter and show all
                        </button>
                  </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedItems.map((study, index) => (
                    <button
                      key={study.id}
                      type="button"
                      onClick={() => setActiveSlug(study.slug)}
                      className="group cursor-pointer animate-enter text-left rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      style={{ animationDelay: `${Math.min(index * 0.06, 0.3)}s` }}
                    >
                      <div className="rounded-t-2xl overflow-hidden relative aspect-video bg-muted">
                        {study.coverImageUrl ? (
                          <img
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={study.coverImageUrl}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="material-icons text-muted-foreground/40 text-5xl" aria-hidden>
                              image
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                          <span className="text-white font-bold flex items-center gap-2 text-sm drop-shadow-lg">
                            View case study
                            <span className="material-icons text-sm" aria-hidden>arrow_forward</span>
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                          {study.client || 'Case Study'}
                        </p>
                        <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {study.title}
                        </h2>
                        {(study.tags?.length ?? 0) > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {(study.tags || []).slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {study.summary}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                )}
              </section>

              <section className="mt-24 pt-20 border-t border-border/60 animate-enter" aria-labelledby="cta-heading">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Have a similar project?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Tell me about your idea and I&apos;ll get back within 12 hours.
                  </p>
                  <ContactForm
                    idPrefix="cta"
                    showCompany={false}
                    variant="compact"
                    showCalendlyOnSuccess
                    className="text-left"
                  />
                </div>
              </section>
            </>
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

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={<CaseStudiesPageFallback />}>
      <CaseStudiesContent />
    </Suspense>
  );
}

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
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-enter">Work</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight animate-enter" style={{ animationDelay: '0.1s' }}>All Case Studies</h1>
            <p className="text-muted-foreground text-lg animate-enter" style={{ animationDelay: '0.2s' }}>Loading…</p>
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
  const [showAllTags, setShowAllTags] = useState(false);

  // Sync URL -> state (e.g. browser back, shared link)
  useEffect(() => {
    const tag = searchParams.get('tag');
    setSelectedTag(tag);
    setSort(parseSort(searchParams.get('sort')));
    setActiveSlug(searchParams.get('open'));
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
      const res = await fetch(`${API_URL}/api/case-studies?published=true&limit=30`, {
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

  // Build tag list sorted by frequency (most-used first)
  const tagFrequency = items.reduce<Record<string, number>>((acc, s) => {
    (s.tags || []).forEach((t) => { acc[t] = (acc[t] || 0) + 1; });
    return acc;
  }, {});
  const allTags = Array.from(
    new Set(items.flatMap((s) => s.tags || []).filter(Boolean))
  ).sort((a, b) => (tagFrequency[b] || 0) - (tagFrequency[a] || 0));

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

  function updateUrl(tag: string | null, sortVal: SortOption, openSlug: string | null) {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sortVal !== 'newest') params.set('sort', sortVal);
    if (openSlug) params.set('open', openSlug);
    const qs = params.toString();
    router.replace(qs ? `/case-studies?${qs}` : '/case-studies', { scroll: false });
  }

  function handleTagSelect(tag: string | null) {
    setSelectedTag(tag);
    updateUrl(tag, sort, activeSlug);
  }

  function handleSortChange(sortVal: SortOption) {
    setSort(sortVal);
    updateUrl(selectedTag, sortVal, activeSlug);
  }

  function handleOpen(slug: string) {
    setActiveSlug(slug);
    updateUrl(selectedTag, sort, slug);
  }

  function handleClose() {
    setActiveSlug(null);
    updateUrl(selectedTag, sort, null);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="max-w-2xl mb-16">
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-enter" style={{ animationDelay: '0s' }}>
              Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight animate-enter" style={{ animationDelay: '0.1s' }}>
              All Case Studies
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-3 animate-enter" style={{ animationDelay: '0.2s' }}>
              A full collection of projects I&apos;ve shipped — from SaaS
              platforms to AI-powered systems.
            </p>
            <p className="text-muted-foreground/90 text-base animate-enter" style={{ animationDelay: '0.3s' }}>
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
                {/* Top bar: count + sort */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="text-muted-foreground text-sm shrink-0">
                    {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
                    {selectedTag && (
                      <button
                        type="button"
                        onClick={() => handleTagSelect(null)}
                        className="ml-2 inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        aria-label="Clear tag filter"
                      >
                        <span className="material-icons text-sm leading-none">close</span>
                        {selectedTag}
                      </button>
                    )}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <label htmlFor="sort-case-studies" className="text-muted-foreground text-xs font-medium hidden sm:block">
                      Sort:
                    </label>
                    <select
                      id="sort-case-studies"
                      value={sort}
                      onChange={(e) => handleSortChange(e.target.value as SortOption)}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="title">A–Z</option>
                    </select>
                  </div>
                </div>

                {/* Tag filter — top 8 visible, expand/collapse for the rest */}
                {allTags.length > 0 && (() => {
                  const TOP_TAGS = 8;
                  const visibleTags = showAllTags ? allTags : allTags.slice(0, TOP_TAGS);
                  const hiddenCount = allTags.length - TOP_TAGS;
                  return (
                    <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by category">
                      {/* All */}
                      <button
                        type="button"
                        role="tab"
                        aria-selected={!selectedTag}
                        onClick={() => handleTagSelect(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          !selectedTag
                            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border/60'
                        }`}
                      >
                        All
                        <span className="ml-1.5 text-xs opacity-70">({items.length})</span>
                      </button>

                      {/* Top 8 (or all when expanded) */}
                      {visibleTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          role="tab"
                          aria-selected={selectedTag === tag}
                          onClick={() => handleTagSelect(tag)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                            selectedTag === tag
                              ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border/60'
                          }`}
                        >
                          {tag}
                          <span className="ml-1.5 text-xs opacity-60">({tagFrequency[tag] || 0})</span>
                        </button>
                      ))}

                      {/* Expand / collapse toggle */}
                      {!showAllTags && hiddenCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowAllTags(true)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-dashed border-border/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          + {hiddenCount} more
                        </button>
                      )}
                      {showAllTags && (
                        <button
                          type="button"
                          onClick={() => setShowAllTags(false)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-dashed border-border/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  );
                })()}

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
                      onClick={() => handleOpen(study.slug)}
                      className="group cursor-pointer animate-enter text-left rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      style={{ animationDelay: `${Math.min(index * 0.06, 0.3)}s` }}
                    >
                      <div className="rounded-t-2xl overflow-hidden relative aspect-video bg-muted">
                        {study.coverImageUrl ? (
                          <img
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={study.coverImageUrl}
                            loading="lazy"
                            decoding="async"
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
                <div className="max-w-5xl mx-auto">
                  <div className="bg-card/80 border border-border/70 rounded-3xl shadow-xl shadow-primary/10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 items-start">
                      <div className="space-y-6">
                        <div>
                          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">
                            Next project
                          </p>
                          <h2
                            id="cta-heading"
                            className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight"
                          >
                            Have a similar project in mind?
                          </h2>
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            Share a bit of context about what you&apos;re building so our first
                            30‑minute call can focus on decisions instead of discovery.
                          </p>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="material-icons text-primary text-base mt-0.5" aria-hidden>
                              check_circle
                            </span>
                            <span>What kind of system you&apos;re planning — headless, AI agent, SaaS, or something else.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-icons text-primary text-base mt-0.5" aria-hidden>
                              check_circle
                            </span>
                            <span>Rough timeline and budget so I can suggest a realistic approach.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-icons text-primary text-base mt-0.5" aria-hidden>
                              check_circle
                            </span>
                            <span>Where you are today — from idea only to a live product that needs scaling.</span>
                          </li>
                        </ul>
                        <p className="text-xs text-muted-foreground/80">
                          You&apos;ll see a Calendly link right after submitting to book a 30‑minute discovery call.
                        </p>
                      </div>
                      <div className="bg-background/80 rounded-2xl border border-border/70 p-4 sm:p-5">
                        <ContactForm
                          idPrefix="cta"
                          showCompany
                          showProjectDetails
                          variant="default"
                          showCalendlyOnSuccess
                          className="text-left"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />

      {activeSlug && (
        <CaseStudyModal slug={activeSlug} onClose={handleClose} />
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

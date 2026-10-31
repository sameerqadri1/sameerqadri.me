'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { fetchPublishedCaseStudies } from '@/lib/api';
import type { CaseStudy } from '@/lib/types';

// Fallback initial records matching production database to ensure instant rendering without layout shift
const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: '645fb539-b0c7-42f1-8c23-b4af78c170b2',
    slug: 'multi-tenant-financial-pos-system',
    title: 'Enterprise Multi-Tenant POS & Financial Management System',
    subtitle: 'A scalable SaaS architecture for retail operations, real-time inventory, and complex financial auditing.',
    summary: 'Engineered a robust, multi-tenant Point of Sale (POS) and ERP system using the MERN stack and PostgreSQL, designed to manage end-to-end business operations for multiple independent vendors.',
    body: '',
    coverImageUrl: 'https://wd2avppmqxczmbe1.public.blob.vercel-storage.com/case-studies/1775459003003-62zyvm.blob',
    tags: ['SaaS', 'Multi-tenant', 'POS', 'PostgreSQL', 'Node.js', 'React'],
    client: 'Enterprise Retail Client',
    year: 2026,
    featured: true,
    order: 0,
    published: true,
    createdAt: '2026-04-06T07:03:46.083Z',
    updatedAt: '2026-04-06T07:24:06.126Z',
  },
  {
    id: '3349d6ad-0274-4abe-8ce9-e9806ae5ec21',
    slug: 'technical-seo-tools-suite',
    title: 'Technical SEO Micro-SaaS: AI Content Generation & Global Crawling Engine',
    subtitle: 'Advanced BFS crawling and Gemini 2.5 AI integration for large-scale site audits.',
    summary: 'Engineered a suite of high-performance SEO tools featuring an AI meta-generator, keyword density strategist, and a robust broken link checker capable of 1,000-page audits.',
    body: '',
    coverImageUrl: 'https://wd2avppmqxczmbe1.public.blob.vercel-storage.com/case-studies/1772309717536-eqfm4f.png',
    tags: ['AI Integration', 'SaaS', 'SEO Tools', 'Web Crawling', 'Gemini AI'],
    client: 'SaaS Marketing',
    year: 2026,
    featured: true,
    order: 1,
    published: true,
    createdAt: '2026-02-28T19:49:28.583Z',
    updatedAt: '2026-02-28T20:15:34.756Z',
  },
  {
    id: '4af48b15-bff2-497e-b14b-879308cd3e5e',
    slug: 'streetwear-official-custom-hybrid-store',
    title: 'Streetwear Official: Custom React-Liquid Hybrid & Enterprise Logistics',
    subtitle: 'Engineering a high-performance fashion storefront with React frontend and deep Zendesk integration.',
    summary: 'Developed a premium streetwear platform on Shopify using a custom React/Liquid hybrid frontend, integrating enterprise-grade support, reviews, and automated fulfillment systems.',
    body: '',
    coverImageUrl: 'https://wd2avppmqxczmbe1.public.blob.vercel-storage.com/case-studies/1774956838365-4qeunj.blob',
    tags: ['Shopify', 'React', 'Liquid', 'Logistics Automation', 'Fashion Tech'],
    client: 'Streetwear Official',
    year: 2025,
    featured: true,
    order: 2,
    published: true,
    createdAt: '2026-03-31T11:39:07.080Z',
    updatedAt: '2026-04-03T12:00:33.420Z',
  },
];

export function CaseStudiesSection() {
  const [items, setItems] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedCaseStudies({ featured: true, limit: 6 })
      .then((data) => {
        if (!cancelled && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          // If network fetch fails, initial state remains intact
          console.warn('Case studies fetch fallback:', err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="py-20 md:py-24 border-b border-border bg-background scroll-mt-16" id="projects">
        <div className="container mx-auto px-6">

          {/* Section head block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>neon database // verified case records</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-2">
                Selected Case Studies
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                Verified production outcomes across headless e-commerce, LLM agent pipelines, and full-stack software.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline shrink-0 group"
            >
              <span>View all 17 database records</span>
              <span className="material-icons text-sm transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((study, index) => (
              <button
                key={study.id}
                type="button"
                onClick={() => setActiveSlug(study.slug)}
                className="group text-left rounded-[10px] border border-border bg-card hover:bg-muted/40 hover:-translate-y-1 hover:border-accent/40 transition-[transform,border-color,background-color] duration-200 p-5 sm:p-6 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
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
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-[filter] duration-300"
                      />
                    </div>
                  ) : null}

                  {/* Meta tag */}
                  <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-2">
                    <span>{study.client || 'Client System'}</span>
                    <span>{study.year || '2026'}</span>
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
                    {(study.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors flex items-center gap-1 shrink-0 ml-2">
                    <span>Inspect</span>
                    <span className="material-icons text-sm transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {activeSlug && (
        <CaseStudyModal
          slug={activeSlug}
          onClose={() => setActiveSlug(null)}
        />
      )}
    </>
  );
}

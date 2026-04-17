import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import type { CaseStudy } from '@/lib/types';
import { buildLanguageAlternates, seoConfig } from '@/seo';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

type CaseStudyDetailResponse = {
  success: boolean;
  data?: CaseStudy;
};

function formatBody(raw: string): string {
  const trimmed = raw.trim();
  if (!/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed
      .split(/\n{2,}/)
      .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  return trimmed
    .replace(/<li>\s*<p>\s*<\/p>\s*<\/li>/gi, '')
    .replace(/<li>\s*<\/li>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<ul>\s*<\/ul>/gi, '')
    .replace(/<ol>\s*<\/ol>/gi, '');
}

async function getCaseStudy(slug: string) {
  if (!API_URL) return null;

  try {
    const res = await fetch(`${API_URL}/api/case-studies/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CaseStudyDetailResponse;
    if (!json.success || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};

  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const path = `/case-studies/${study.slug}/`;
  const title = `${study.title} — Case Study`;
  const description =
    study.summary ||
    `Case study: ${study.title} by ${seoConfig.siteName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: seoConfig.siteName,
      type: 'article',
      images: study.coverImageUrl ? [study.coverImageUrl] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: study.coverImageUrl ? [study.coverImageUrl] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) notFound();

  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}/case-studies/${study.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    author: {
      '@type': 'Person',
      name: 'Sameer Qadri',
      url: baseUrl,
    },
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: study.coverImageUrl ? [study.coverImageUrl] : undefined,
    datePublished: study.createdAt || undefined,
    keywords: study.tags?.join(', ') || undefined,
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <Script
            id={`jsonld-case-study-${study.slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {study.coverImageUrl ? (
            <img
              src={study.coverImageUrl}
              alt={study.title}
              className="w-full aspect-video object-cover rounded-2xl border border-border/60 mb-8"
            />
          ) : null}
          <header className="mb-8">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-2">
              {study.client || 'Case Study'}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {study.title}
            </h1>
            {study.subtitle ? (
              <p className="mt-3 text-muted-foreground text-lg">
                {study.subtitle}
              </p>
            ) : null}
            {study.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>
          <p className="text-muted-foreground text-base leading-relaxed border-l-2 border-primary/40 pl-4 mb-8">
            {study.summary}
          </p>
          {study.body ? (
            <div
              className="rich-body border-t border-border pt-6"
              dangerouslySetInnerHTML={{ __html: formatBody(study.body) }}
            />
          ) : null}
          <div className="mt-12">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              <span className="material-icons text-base" aria-hidden>
                arrow_back
              </span>
              Back to all case studies
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

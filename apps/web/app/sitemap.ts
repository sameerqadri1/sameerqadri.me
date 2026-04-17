import type { MetadataRoute } from 'next';
import { seoConfig } from '../seo';
import type { CaseStudyListResponse } from '../lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

async function fetchPublishedCaseStudies() {
  if (!API_URL) return [];

  try {
    const res = await fetch(
      `${API_URL}/api/case-studies?published=true&limit=100`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as CaseStudyListResponse;
    if (!json.success || !Array.isArray(json.data)) return [];
    return json.data;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();
  const studies = await fetchPublishedCaseStudies();
  const caseStudyEntries = studies
    .filter((study) => Boolean(study.slug))
    .map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}/`,
      lastModified: study.createdAt ? new Date(study.createdAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/case-studies/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms-full.md`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...caseStudyEntries,
  ];
}

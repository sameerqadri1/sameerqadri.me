import type { Metadata } from 'next';
import seoConfigJson from './seo.generated.json';

type SeoConfig = typeof seoConfigJson;

export const seoConfig: SeoConfig = seoConfigJson;

export function buildBaseMetadata(): Metadata {
  const { siteName, home } = seoConfig;
  const title = home.title || siteName;
  const description = home.description;

  const ogImage =
    home.ogImage ??
    `${seoConfig.siteUrl.replace(/\/$/, '')}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(seoConfig.siteUrl),
    openGraph: {
      title,
      description,
      siteName,
      url: seoConfig.siteUrl,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildCaseStudiesMetadata(): Metadata {
  const { siteName, caseStudies } = seoConfig;
  const title = caseStudies.title || `Case Studies — ${siteName}`;
  const description = caseStudies.description;

  const ogImage =
    caseStudies.ogImage ??
    `${seoConfig.siteUrl.replace(/\/$/, '')}/og-case-studies.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      url: `${seoConfig.siteUrl.replace(/\/$/, '')}/case-studies/`,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}


import type { Metadata } from 'next';
import seoConfigJson from './seo.generated.json';

type SeoConfig = typeof seoConfigJson;

export const seoConfig: SeoConfig = seoConfigJson;

export const targetLanguageAlternates = {
  'x-default': '/',
  en: '/',
  'en-US': '/',
  'en-GB': '/',
  'en-CA': '/',
  'en-AU': '/',
  'en-PK': '/',
  'en-SA': '/',
} as const;

export function buildLanguageAlternates(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return {
    'x-default': cleanPath,
    en: cleanPath,
    'en-US': cleanPath,
    'en-GB': cleanPath,
    'en-CA': cleanPath,
    'en-AU': cleanPath,
    'en-PK': cleanPath,
    'en-SA': cleanPath,
  };
}

export function buildBaseMetadata(): Metadata {
  const { siteName, home } = seoConfig;
  const title = home.title || siteName;
  const description = home.description;
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const homeUrl = `${baseUrl}/`;

  const ogImage =
    home.ogImage ??
    `${baseUrl}/opengraph-image`;

  return {
    title,
    description,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: '/',
      languages: targetLanguageAlternates,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      title,
      description,
      siteName,
      url: homeUrl,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@coder_qadri',
      creator: '@coder_qadri',
    },
  };
}

export function buildCaseStudiesMetadata(): Metadata {
  const { siteName, caseStudies } = seoConfig;
  const title = caseStudies.title || `Case Studies — ${siteName}`;
  const description = caseStudies.description;
  const caseStudiesPath = '/case-studies/';

  const ogImage =
    caseStudies.ogImage ??
    `${seoConfig.siteUrl.replace(/\/$/, '')}/og-case-studies.png`;

  return {
    title,
    description,
    alternates: {
      canonical: caseStudiesPath,
      languages: buildLanguageAlternates(caseStudiesPath),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      siteName,
      url: `${seoConfig.siteUrl.replace(/\/$/, '')}${caseStudiesPath}`,
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


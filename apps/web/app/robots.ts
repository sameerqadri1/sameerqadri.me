import type { MetadataRoute } from 'next';
import { seoConfig } from '../seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/panel-sq8701/', '/panel-sq8701'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

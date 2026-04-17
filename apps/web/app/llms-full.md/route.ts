import { seoConfig } from '../../seo';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

  const body = [
    `# ${seoConfig.siteName}`,
    '',
    'Full Stack Engineer specializing in headless systems, AI agents, and SaaS products.',
    '',
    '## About',
    `- Website: ${baseUrl}/`,
    '- Name: Sameer Qadri',
    '- Role: Full Stack Engineer',
    '',
    '## Important Pages',
    `- Home: ${baseUrl}/`,
    `- Case Studies: ${baseUrl}/case-studies/`,
    '',
    '## Case Study URLs',
    '- Discover all case studies from sitemap:',
    `  - ${baseUrl}/sitemap.xml`,
    '',
    '## Capabilities',
    '- Build scalable web applications',
    '- Architect headless platforms',
    '- Develop and integrate AI agents',
    '- Deliver production-ready SaaS systems',
    '',
    '## Contact',
    `- Contact section: ${baseUrl}/#contact`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

import { seoConfig } from '../../seo';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

  const body = [
    `# ${seoConfig.siteName}`,
    '',
    '> Portfolio website for Sameer Qadri, Full Stack Engineer.',
    '',
    '## Primary URLs',
    `- ${baseUrl}/`,
    `- ${baseUrl}/case-studies/`,
    '',
    '## Structured Content',
    `- LLM index: ${baseUrl}/llms.txt`,
    `- LLM extended: ${baseUrl}/llms-full.md`,
    `- Sitemap: ${baseUrl}/sitemap.xml`,
    `- Robots: ${baseUrl}/robots.txt`,
    '',
    '## Topics',
    '- Full-stack engineering',
    '- SaaS development',
    '- Headless architecture',
    '- AI agent development',
    '- Client case studies',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

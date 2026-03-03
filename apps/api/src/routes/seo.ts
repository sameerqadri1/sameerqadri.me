import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const seoRouter = Router();

function buildDefaultConfig() {
  return {
    siteName: 'Sameer Qadri — Full Stack Engineer',
    siteUrl: 'https://sameerqadri.me',
    home: {
      title: 'Sameer Qadri — Full Stack Engineer',
      description:
        'Full Stack Engineer specializing in headless systems, AI agents, and SaaS products. 50+ projects delivered across 10+ countries.',
      ogImage: null as string | null,
    },
    caseStudies: {
      title: 'Client Case Studies — Sameer Qadri',
      description:
        'Real client projects where I built headless systems, AI agents, and SaaS products that shipped to production.',
      ogImage: null as string | null,
    },
  };
}

export type SeoConfig = ReturnType<typeof buildDefaultConfig>;

seoRouter.get('/', async (_req, res) => {
  try {
    const row = await prisma.seoSettings.findUnique({ where: { id: 1 } });
    if (!row) {
      return res.json({
        success: true,
        data: buildDefaultConfig(),
      });
    }

    const data: SeoConfig = {
      siteName: row.siteName,
      siteUrl: row.siteUrl,
      home: {
        title: row.homeTitle,
        description: row.homeDescription,
        ogImage: row.homeOgImage ?? null,
      },
      caseStudies: {
        title: row.caseStudiesTitle,
        description: row.caseStudiesDescription,
        ogImage: row.caseStudiesOgImage ?? null,
      },
    };

    res.json({ success: true, data });
  } catch (e) {
    console.error('SEO config error:', e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to load SEO configuration' },
    });
  }
});


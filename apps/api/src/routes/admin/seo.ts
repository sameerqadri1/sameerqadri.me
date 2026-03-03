import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import type { SeoConfig } from '../seo.js';

export const adminSeoRouter = Router();

const seoConfigSchema = z.object({
  siteName: z.string().min(1),
  siteUrl: z.string().url(),
  home: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    ogImage: z.string().url().nullable().optional(),
  }),
  caseStudies: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    ogImage: z.string().url().nullable().optional(),
  }),
});

adminSeoRouter.get('/', async (_req, res) => {
  try {
    const row = await prisma.seoSettings.findUnique({ where: { id: 1 } });
    if (!row) {
      return res.json({
        success: true,
        data: null,
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
    console.error('Admin SEO load error:', e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to load SEO configuration' },
    });
  }
});

adminSeoRouter.put('/', async (req, res) => {
  try {
    const parsed = seoConfigSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid SEO data', details: parsed.error.flatten() },
      });
    }
    const cfg = parsed.data;

    const row = await prisma.seoSettings.upsert({
      where: { id: 1 },
      update: {
        siteName: cfg.siteName,
        siteUrl: cfg.siteUrl,
        homeTitle: cfg.home.title,
        homeDescription: cfg.home.description,
        homeOgImage: cfg.home.ogImage ?? null,
        caseStudiesTitle: cfg.caseStudies.title,
        caseStudiesDescription: cfg.caseStudies.description,
        caseStudiesOgImage: cfg.caseStudies.ogImage ?? null,
      },
      create: {
        id: 1,
        siteName: cfg.siteName,
        siteUrl: cfg.siteUrl,
        homeTitle: cfg.home.title,
        homeDescription: cfg.home.description,
        homeOgImage: cfg.home.ogImage ?? null,
        caseStudiesTitle: cfg.caseStudies.title,
        caseStudiesDescription: cfg.caseStudies.description,
        caseStudiesOgImage: cfg.caseStudies.ogImage ?? null,
      },
    });

    res.json({
      success: true,
      data: {
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
      } satisfies SeoConfig,
    });
  } catch (e) {
    console.error('Admin SEO save error:', e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to save SEO configuration' },
    });
  }
});


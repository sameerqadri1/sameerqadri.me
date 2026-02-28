import { Router } from 'express';
import { caseStudyQuerySchema } from '../lib/shared.js';
import type { CaseStudy } from '../generated/prisma/client.js';
import { prisma } from '../lib/prisma.js';

export const caseStudiesRouter = Router();

caseStudiesRouter.get('/', async (req, res) => {
  try {
    const parsed = caseStudyQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid query', details: parsed.error.flatten() },
      });
    }
    const { published, featured, page, limit } = parsed.data;

    const where: { published?: boolean; featured?: boolean } = {};
    if (published !== undefined) where.published = published;
    if (featured !== undefined) where.featured = featured;

    const [items, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.caseStudy.count({ where }),
    ]);

    const caseStudies = items.map((row: CaseStudy) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));

    res.json({
      success: true,
      data: caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch case studies' },
    });
  }
});

caseStudiesRouter.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const study = await prisma.caseStudy.findUnique({ where: { slug } });
    if (!study) {
      return res.status(404).json({
        success: false,
        error: { message: 'Case study not found', code: 'NOT_FOUND' },
      });
    }
    res.json({
      success: true,
      data: {
        ...study,
        createdAt: study.createdAt.toISOString(),
        updatedAt: study.updatedAt.toISOString(),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch case study' },
    });
  }
});

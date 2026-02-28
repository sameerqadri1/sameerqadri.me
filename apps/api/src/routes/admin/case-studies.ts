import { Router } from 'express';
import type { Request } from 'express';
import {
  caseStudyCreateSchema,
  caseStudyUpdateSchema,
} from '../../lib/shared.js';
import type { AuthPayload } from '../../middleware/auth.js';
import { prisma } from '../../lib/prisma.js';

export const adminCaseStudiesRouter = Router({ mergeParams: true });

function toResponse(row: {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string;
  body: string;
  coverImageUrl: string | null;
  galleryUrls: string[];
  tags: string[];
  client: string | null;
  year: number | null;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

adminCaseStudiesRouter.get('/', async (_req: Request & { auth?: AuthPayload }, res) => {
  try {
    const items = await prisma.caseStudy.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json({
      success: true,
      data: items.map(toResponse),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to list case studies' },
    });
  }
});

adminCaseStudiesRouter.get('/:id', async (req: Request & { auth?: AuthPayload }, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: { message: 'Missing id' } });
    }
    const study = await prisma.caseStudy.findUnique({
      where: { id },
    });
    if (!study) {
      return res.status(404).json({
        success: false,
        error: { message: 'Case study not found', code: 'NOT_FOUND' },
      });
    }
    res.json({ success: true, data: toResponse(study) });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch case study' },
    });
  }
});

adminCaseStudiesRouter.post('/', async (req: Request & { auth?: AuthPayload }, res) => {
  try {
    const parsed = caseStudyCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid body', details: parsed.error.flatten() },
      });
    }
    const data = parsed.data;

    const existing = await prisma.caseStudy.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { message: 'Slug already in use', code: 'SLUG_CONFLICT' },
      });
    }

    const study = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle ?? null,
        summary: data.summary,
        body: data.body,
        coverImageUrl: data.coverImageUrl ?? null,
        galleryUrls: data.galleryUrls ?? [],
        tags: data.tags ?? [],
        client: data.client ?? null,
        year: data.year ?? null,
        featured: data.featured ?? false,
        order: data.order ?? 0,
        published: data.published ?? false,
      },
    });
    res.status(201).json({ success: true, data: toResponse(study) });
  } catch (e) {
    console.error('Create case study error:', e);
    const msg = e instanceof Error ? e.message : 'Failed to create case study';
    res.status(500).json({
      success: false,
      error: { message: msg },
    });
  }
});

adminCaseStudiesRouter.put('/:id', async (req: Request & { auth?: AuthPayload }, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: { message: 'Missing id' } });
    }
    const parsed = caseStudyUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid body', details: parsed.error.flatten() },
      });
    }
    const data = parsed.data;

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { message: 'Case study not found', code: 'NOT_FOUND' },
      });
    }

    if (data.slug !== undefined && data.slug !== existing.slug) {
      const slugTaken = await prisma.caseStudy.findUnique({
        where: { slug: data.slug },
      });
      if (slugTaken) {
        return res.status(409).json({
          success: false,
          error: { message: 'Slug already in use', code: 'SLUG_CONFLICT' },
        });
      }
    }

    const study = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
        ...(data.summary !== undefined && { summary: data.summary }),
        ...(data.body !== undefined && { body: data.body }),
        ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl }),
        ...(data.galleryUrls !== undefined && { galleryUrls: data.galleryUrls }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.client !== undefined && { client: data.client }),
        ...(data.year !== undefined && { year: data.year }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });
    res.json({ success: true, data: toResponse(study) });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update case study' },
    });
  }
});

adminCaseStudiesRouter.delete('/:id', async (req: Request & { auth?: AuthPayload }, res) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: { message: 'Missing id' } });
    }
    await prisma.caseStudy.delete({ where: { id } });
    res.status(204).send();
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: { message: 'Case study not found', code: 'NOT_FOUND' },
      });
    }
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete case study' },
    });
  }
});

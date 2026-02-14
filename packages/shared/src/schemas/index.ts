/**
 * Zod validation schemas for API requests/responses
 */

import { z } from 'zod';

export const caseStudySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).optional(),
  summary: z.string().min(1).max(500),
  body: z.string().min(1),
  coverImageUrl: z.string().url().optional(),
  galleryUrls: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  client: z.string().max(100).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const caseStudyCreateSchema = caseStudySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const caseStudyUpdateSchema = caseStudyCreateSchema.partial();

export const caseStudyQuerySchema = z.object({
  published: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  featured: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().int().min(1).max(100)),
});

// Auth schemas
export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const uploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.string().regex(/^image\/(jpeg|png|gif|webp)$/),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
});

export type CaseStudySchema = z.infer<typeof caseStudySchema>;
export type CaseStudyCreateSchema = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdateSchema = z.infer<typeof caseStudyUpdateSchema>;
export type CaseStudyQuerySchema = z.infer<typeof caseStudyQuerySchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type UploadSchema = z.infer<typeof uploadSchema>;

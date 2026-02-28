/**
 * Inlined copy of @portfolio/shared — types and schemas.
 * Kept here so the API is self-contained and deployable without a monorepo build.
 */

import { z } from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  body: string;
  coverImageUrl?: string;
  galleryUrls: string[];
  tags: string[];
  client?: string;
  year?: number;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CaseStudyCreateInput = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>;
export type CaseStudyUpdateInput = Partial<CaseStudyCreateInput>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { message: string; code?: string };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: { page: number; limit: number; total: number; totalPages: number };
}

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const caseStudySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).optional(),
  summary: z.string().min(1).max(500),
  body: z.string().min(1),
  coverImageUrl: z.string().url().optional().or(z.literal('')).transform(v => v || undefined),
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

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const uploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.string().regex(/^image\/(jpeg|png|gif|webp)$/),
  size: z.number().max(5 * 1024 * 1024),
});

export type CaseStudySchema = z.infer<typeof caseStudySchema>;
export type CaseStudyCreateSchema = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdateSchema = z.infer<typeof caseStudyUpdateSchema>;
export type CaseStudyQuerySchema = z.infer<typeof caseStudyQuerySchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type UploadSchema = z.infer<typeof uploadSchema>;

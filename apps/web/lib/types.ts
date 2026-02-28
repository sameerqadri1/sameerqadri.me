/**
 * Shared types for case studies and API responses.
 * Single source of truth for frontend; keep in sync with API responses.
 *
 * API error shape (used by contact, case-studies, etc.):
 * { success: false, error: { message: string, details?: unknown } }
 */

/** Case study as returned by list (/) and detail (/:slug) endpoints. Detail includes body, subtitle, year. */
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  summary: string;
  client?: string | null;
  coverImageUrl?: string | null;
  tags?: string[];
  createdAt?: string;
  order?: number;
  /** Only on detail */
  subtitle?: string | null;
  body?: string;
  year?: number | null;
}

/** List endpoint response shape. */
export interface CaseStudyListResponse {
  success: boolean;
  data?: CaseStudy[];
  pagination?: { total: number; page?: number; limit?: number; totalPages?: number };
  error?: { message?: string };
}

/**
 * Shared TypeScript types for the portfolio project
 */

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

export type CaseStudyCreateInput = Omit<
  CaseStudy,
  'id' | 'createdAt' | 'updatedAt'
>;

export type CaseStudyUpdateInput = Partial<CaseStudyCreateInput>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

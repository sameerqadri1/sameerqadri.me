import type { CaseStudy, CaseStudyListResponse, CaseStudyResponse } from './types';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://sameerqadri-me-api.vercel.app';

export interface HealthResponse {
  success: boolean;
  data?: {
    status: string;
    database: string;
  };
}

export async function checkBackendHealth(): Promise<{
  online: boolean;
  database: string;
  latencyMs: number;
}> {
  const start = Date.now();
  try {
    const res = await fetch(`${API_URL}/api/health`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      return { online: false, database: 'offline', latencyMs };
    }
    const json = (await res.json()) as HealthResponse;
    return {
      online: json.success && json.data?.status === 'ok',
      database: json.data?.database || 'unknown',
      latencyMs,
    };
  } catch {
    return {
      online: false,
      database: 'disconnected',
      latencyMs: Date.now() - start,
    };
  }
}

export async function fetchPublishedCaseStudies(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<CaseStudy[]> {
  const params = new URLSearchParams({
    published: 'true',
    ...(options?.featured ? { featured: 'true' } : {}),
    ...(options?.limit ? { limit: String(options.limit) } : {}),
  });

  const res = await fetch(`${API_URL}/api/case-studies?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch case studies: ${res.statusText}`);
  }

  const json = (await res.json()) as CaseStudyListResponse;
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.error?.message || 'Failed to fetch case studies');
  }

  return json.data;
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const res = await fetch(`${API_URL}/api/case-studies/${slug}`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch case study: ${res.statusText}`);
  }

  const json = (await res.json()) as CaseStudyResponse;
  if (!json.success || !json.data) {
    throw new Error(json.error?.message || 'Case study not found');
  }

  return json.data;
}

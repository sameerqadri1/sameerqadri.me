const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('admin_token');
}

export async function adminFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (typeof (options.body as string) === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  return fetch(`${API_URL}${path}`, { ...options, headers });
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  summary: string;
  body: string;
  coverImageUrl?: string | null;
  galleryUrls: string[];
  tags: string[];
  client?: string | null;
  year?: number | null;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function listCaseStudies(): Promise<CaseStudy[]> {
  const res = await adminFetch('/api/admin/case-studies');
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? 'Failed to list');
  return json.data ?? [];
}

export async function getCaseStudy(id: string): Promise<CaseStudy> {
  const res = await adminFetch(`/api/admin/case-studies/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? 'Failed to fetch');
  return json.data;
}

export type CaseStudyCreate = Omit<
  CaseStudy,
  'id' | 'createdAt' | 'updatedAt'
>;

export async function createCaseStudy(data: CaseStudyCreate): Promise<CaseStudy> {
  const res = await adminFetch('/api/admin/case-studies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? 'Failed to create');
  return json.data;
}

export type CaseStudyUpdate = Partial<CaseStudyCreate>;

export async function updateCaseStudy(
  id: string,
  data: CaseStudyUpdate
): Promise<CaseStudy> {
  const res = await adminFetch(`/api/admin/case-studies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? 'Failed to update');
  return json.data;
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/case-studies/${id}`, {
    method: 'DELETE',
  });
  if (res.status !== 204) {
    const json = await res.json();
    throw new Error(json.error?.message ?? 'Failed to delete');
  }
}

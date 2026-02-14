'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  getCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  type CaseStudy,
  type CaseStudyUpdate,
} from '@/lib/admin-api';

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState<CaseStudyUpdate>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getCaseStudy(id)
      .then((data) => {
        setStudy(data);
        setForm({
          slug: data.slug,
          title: data.title,
          subtitle: data.subtitle ?? '',
          summary: data.summary,
          body: data.body,
          coverImageUrl: data.coverImageUrl ?? '',
          galleryUrls: data.galleryUrls ?? [],
          tags: data.tags ?? [],
          client: data.client ?? '',
          year: data.year ?? undefined,
          featured: data.featured,
          order: data.order,
          published: data.published,
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'));
  }, [id]);

  function update<K extends keyof CaseStudyUpdate>(
    key: K,
    value: CaseStudyUpdate[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError('');
    setLoading(true);
    try {
      const payload: CaseStudyUpdate = {
        ...form,
        slug: (form.slug as string)?.trim() || undefined,
        title: (form.title as string)?.trim() || undefined,
        subtitle: (form.subtitle as string)?.trim() || undefined,
        summary: (form.summary as string)?.trim() || undefined,
        body: (form.body as string)?.trim() || undefined,
        coverImageUrl: (form.coverImageUrl as string)?.trim() || undefined,
        galleryUrls: Array.isArray(form.galleryUrls)
          ? form.galleryUrls.filter(Boolean)
          : [],
        tags: Array.isArray(form.tags) ? form.tags : [],
        client: (form.client as string)?.trim() || undefined,
        year: form.year ? Number(form.year) : undefined,
      };
      await updateCaseStudy(id, payload);
      router.push('/admin/case-studies/');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!id || !study) return;
    if (!confirm(`Delete "${study.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteCaseStudy(id);
      router.push('/admin/case-studies/');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  }

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/admin/case-studies/"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          ← Case studies
        </Link>
        <p className="mt-6 text-[var(--color-text-muted)]">
          Missing id. Open edit from the case studies list.
        </p>
      </div>
    );
  }

  if (error && !study) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/admin/case-studies/"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          ← Case studies
        </Link>
        <p className="mt-6 text-red-400">{error}</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-[var(--color-text-muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/admin/case-studies/"
        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        ← Case studies
      </Link>
      <h1 className="mt-6 text-2xl font-semibold text-[var(--color-text)]">
        Edit: {study.title}
      </h1>
      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Field label="Title" required>
          <input
            value={(form.title as string) ?? ''}
            onChange={(e) => update('title', e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Slug">
          <input
            value={(form.slug as string) ?? ''}
            onChange={(e) => update('slug', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Subtitle">
          <input
            value={(form.subtitle as string) ?? ''}
            onChange={(e) => update('subtitle', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Summary" required>
          <textarea
            value={(form.summary as string) ?? ''}
            onChange={(e) => update('summary', e.target.value)}
            required
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Body" required>
          <textarea
            value={(form.body as string) ?? ''}
            onChange={(e) => update('body', e.target.value)}
            required
            rows={8}
            className="input"
          />
        </Field>
        <Field label="Cover image URL">
          <input
            type="url"
            value={(form.coverImageUrl as string) ?? ''}
            onChange={(e) => update('coverImageUrl', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
            onChange={(e) =>
              update(
                'tags',
                e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
              )
            }
            className="input"
          />
        </Field>
        <Field label="Client">
          <input
            value={(form.client as string) ?? ''}
            onChange={(e) => update('client', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Year">
          <input
            type="number"
            min={2000}
            max={2100}
            value={(form.year as number) ?? ''}
            onChange={(e) =>
              update('year', e.target.value ? Number(e.target.value) : undefined)
            }
            className="input"
          />
        </Field>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            <span className="text-[var(--color-text)]">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!form.published}
              onChange={(e) => update('published', e.target.checked)}
            />
            <span className="text-[var(--color-text)]">Published</span>
          </label>
        </div>
        <Field label="Order">
          <input
            type="number"
            value={(form.order as number) ?? 0}
            onChange={(e) => update('order', Number(e.target.value) || 0)}
            className="input"
          />
        </Field>
        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--color-accent)] px-6 py-2 font-medium text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
          <Link
            href="/admin/case-studies/"
            className="rounded-lg border border-white/20 px-6 py-2 font-medium text-[var(--color-text)] hover:border-white/40"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg border border-red-400/50 px-6 py-2 font-medium text-red-400 hover:bg-red-400/10 disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]">
        {label}
        {required && ' *'}
      </label>
      <div className="mt-1 [&_.input]:w-full [&_.input]:rounded-lg [&_.input]:border [&_.input]:border-white/20 [&_.input]:bg-[var(--color-bg-elevated)] [&_.input]:px-4 [&_.input]:py-2 [&_.input]:text-[var(--color-text)] [&_.input]:focus:border-[var(--color-accent)] [&_.input]:focus:outline-none [&_.input]:focus:ring-1 [&_.input]:focus:ring-[var(--color-accent)]">
        {children}
      </div>
    </div>
  );
}

export default function EditCaseStudyPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-6 py-12">
          <p className="text-[var(--color-text-muted)]">Loading…</p>
        </div>
      }
    >
      <EditForm />
    </Suspense>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCaseStudy, type CaseStudyCreate } from '@/lib/admin-api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

const defaultForm: CaseStudyCreate = {
  slug: '',
  title: '',
  subtitle: '',
  summary: '',
  body: '',
  coverImageUrl: '',
  galleryUrls: [],
  tags: [],
  client: '',
  year: undefined,
  featured: false,
  order: 0,
  published: false,
};

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [form, setForm] = useState<CaseStudyCreate>(defaultForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update<K extends keyof CaseStudyCreate>(
    key: K,
    value: CaseStudyCreate[K]
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && typeof value === 'string') {
        const slug = value
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        if (slug) next.slug = prev.slug ?? slug;
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const slug =
        (form.slug as string)?.trim() ||
        (form.title as string)
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '') ||
        'untitled';
      const payload: CaseStudyCreate = {
        ...form,
        slug,
        title: (form.title as string)?.trim() || 'Untitled',
        summary: (form.summary as string)?.trim() || '',
        body: (form.body as string)?.trim() || '',
        subtitle: (form.subtitle as string)?.trim() || undefined,
        coverImageUrl: (form.coverImageUrl as string)?.trim() || undefined,
        galleryUrls: Array.isArray(form.galleryUrls)
          ? form.galleryUrls.filter(Boolean)
          : [],
        tags: Array.isArray(form.tags) ? form.tags : [],
        client: (form.client as string)?.trim() || undefined,
        year: form.year ? Number(form.year) : undefined,
      };
      await createCaseStudy(payload);
      router.push('/panel-sq8701/case-studies/');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/panel-sq8701/case-studies/" className="text-muted-foreground hover:text-foreground">
        ← Case studies
      </Link>
      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        New case study
      </h1>
      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Slug (URL-friendly, e.g. my-project)">
          <input
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            placeholder="my-project"
            className="input"
          />
        </Field>
        <Field label="Subtitle">
          <input
            value={form.subtitle ?? ''}
            onChange={(e) => update('subtitle', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Summary" required>
          <textarea
            value={form.summary}
            onChange={(e) => update('summary', e.target.value)}
            required
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Body" required>
          <RichTextEditor
            value={form.body}
            onChange={(html) => update('body', html)}
            placeholder="Use headings, lists, links, bold/italic. Paste content and it will keep basic formatting."
          />
        </Field>
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Cover Image
          </label>
          <div className="mt-1">
            <ImageUpload
              value={form.coverImageUrl}
              onChange={(url) => update('coverImageUrl', url)}
            />
          </div>
        </div>
        <Field label="Tags (comma-separated)">
          <input
            value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
            onChange={(e) =>
              update(
                'tags',
                e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            placeholder="web, design, branding"
            className="input"
          />
        </Field>
        <Field label="Client">
          <input
            value={form.client ?? ''}
            onChange={(e) => update('client', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Year">
          <input
            type="number"
            min={2000}
            max={2100}
            value={form.year ?? ''}
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
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            <span className="text-foreground">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update('published', e.target.checked)}
            />
            <span className="text-foreground">Published</span>
          </label>
        </div>
        <Field label="Order (number for sorting)">
          <input
            type="number"
            value={form.order}
            onChange={(e) => update('order', Number(e.target.value) || 0)}
            className="input"
          />
        </Field>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create'}
          </button>
          <Link
            href="/panel-sq8701/case-studies/"
            className="rounded-lg border border-border px-6 py-2 font-medium text-foreground hover:border-border/80"
          >
            Cancel
          </Link>
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
      <label className="mb-1 block text-sm font-medium text-muted-foreground">
        {label}
        {required && ' *'}
      </label>
      <div className="mt-1 [&_.input]:w-full [&_.input]:rounded-lg [&_.input]:border [&_.input]:border-border [&_.input]:bg-card [&_.input]:px-4 [&_.input]:py-2 [&_.input]:text-foreground [&_.input]:focus:border-primary [&_.input]:focus:outline-none [&_.input]:focus:ring-1 [&_.input]:focus:ring-primary">
        {children}
      </div>
    </div>
  );
}

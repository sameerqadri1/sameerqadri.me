'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  listCaseStudies,
  deleteCaseStudy,
  type CaseStudy,
} from '@/lib/admin-api';

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function load() {
    setError('');
    listCaseStudies()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function handleDelete(study: CaseStudy) {
    if (!confirm(`Delete "${study.title}"? This cannot be undone.`)) return;
    setDeletingId(study.id);
    deleteCaseStudy(study.id)
      .then(() => load())
      .catch((e) => setError(e instanceof Error ? e.message : 'Delete failed'))
      .finally(() => setDeletingId(null));
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/"
          className="text-muted-foreground hover:text-foreground"
        >
          ← Dashboard
        </Link>
        <Link
          href="/admin/case-studies/new/"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          New case study
        </Link>
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        Case studies
      </h1>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      )}

      {!loading && items.length === 0 && (
        <p className="mt-6 text-muted-foreground">
          No case studies yet. Create one to get started.
        </p>
      )}

      {!loading && items.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-4 font-medium text-muted-foreground">
                  Title
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">
                  Slug
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">
                  Featured
                </th>
                <th className="pb-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((study) => (
                <tr
                  key={study.id}
                  className="border-b border-border/40 hover:bg-card/60"
                >
                  <td className="py-3 pr-4 text-foreground">{study.title}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {study.slug}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={
                        study.published ? 'text-green-400' : 'text-muted-foreground'
                      }
                    >
                      {study.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {study.featured ? 'Yes' : '—'}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/case-studies/edit/?id=${encodeURIComponent(study.id)}`}
                      className="mr-3 text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(study)}
                      disabled={deletingId === study.id}
                      className="text-red-400 hover:underline disabled:opacity-50"
                    >
                      {deletingId === study.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

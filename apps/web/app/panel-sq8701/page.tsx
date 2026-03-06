'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clearAdminToken } from './AdminGuard';
import { listCaseStudies, getSeoConfig } from '@/lib/admin-api';

interface DashboardStats {
  total: number;
  published: number;
  featured: number;
  drafts: number;
  lastUpdatedLabel: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [cases, seo] = await Promise.allSettled([
          listCaseStudies(),
          getSeoConfig(),
        ]);

        let total = 0;
        let published = 0;
        let featured = 0;
        let lastUpdated: Date | null = null;

        if (cases.status === 'fulfilled') {
          const cs = cases.value;
          total = cs.length;
          published = cs.filter((c) => c.published).length;
          featured = cs.filter((c) => c.featured).length;
          const dates = cs
            .map((c) => new Date(c.updatedAt || c.createdAt))
            .filter((d) => !Number.isNaN(d.getTime()));
          if (dates.length > 0) {
            lastUpdated = new Date(Math.max(...dates.map((d) => d.getTime())));
          }
        } else {
          console.error('Failed to load case study stats', cases.reason);
          setError('Could not load case study stats.');
        }

        if (seo.status === 'fulfilled' && seo.value) {
          // Use updatedAt from SEO if it exists in the future; for now we just log presence.
          // This keeps the door open for a dedicated SEO summary later.
        } else if (seo.status === 'rejected') {
          console.error('Failed to load SEO config summary', seo.reason);
        }

        if (cancelled) return;

        setStats({
          total,
          published,
          featured,
          drafts: Math.max(total - published, 0),
          lastUpdatedLabel: lastUpdated
            ? lastUpdated.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'Not yet',
        });
      } catch (e) {
        console.error('Admin dashboard load error', e);
        if (!cancelled) {
          setError('Could not load admin overview.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleLogout() {
    clearAdminToken();
    router.push('/panel-sq8701/login/');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Admin
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
            Portfolio control center
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Manage the work that appears on your site, keep SEO in sync, and stay on top of new
            inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            ← Back to site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground"
          >
            Log out
          </button>
        </div>
      </header>

      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-card/60 px-4 py-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Published</p>
            <p className="text-2xl font-semibold text-foreground">
              {stats ? stats.published : '—'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 px-4 py-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Featured</p>
            <p className="text-2xl font-semibold text-foreground">
              {stats ? stats.featured : '—'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 px-4 py-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Drafts</p>
            <p className="text-2xl font-semibold text-foreground">
              {stats ? stats.drafts : '—'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 px-4 py-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Last updated</p>
            <p className="text-sm font-semibold text-foreground">
              {stats ? stats.lastUpdatedLabel : '—'}
            </p>
          </div>
        </div>
        {loading && (
          <p className="mt-2 text-xs text-muted-foreground">Loading latest stats…</p>
        )}
        {error && !loading && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="material-icons text-primary text-base" aria-hidden>
              work_outline
            </span>
            Case studies
          </h2>
          <p className="text-sm text-muted-foreground">
            Add new client work, update summaries, and choose which projects are featured on the
            homepage and case studies page.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/panel-sq8701/case-studies/new"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              New case study
            </Link>
            <Link
              href="/panel-sq8701/case-studies/"
              className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/40"
            >
              Manage all
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="material-icons text-primary text-base" aria-hidden>
              public
            </span>
            SEO & previews
          </h2>
          <p className="text-sm text-muted-foreground">
            Control how your home and case studies pages appear in search results and when links are
            shared on social platforms.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/panel-sq8701/seo/"
              className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/40"
            >
              Edit SEO settings
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card/60 px-4 py-4 text-xs text-muted-foreground">
        <p>
          Tip: if something looks wrong on the live site (missing case studies, old SEO), first
          check the values here, then trigger a new deployment on GitHub so the static site can pick
          up the latest data.
        </p>
      </section>
    </div>
  );
}

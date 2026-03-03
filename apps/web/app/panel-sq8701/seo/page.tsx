'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { getSeoConfig, updateSeoConfig, type SeoConfig } from '@/lib/admin-api';

const EMPTY_CONFIG: SeoConfig = {
  siteName: 'Sameer Qadri — Full Stack Engineer',
  siteUrl: 'https://sameerqadri.me',
  home: {
    title: 'Sameer Qadri — Full Stack Engineer',
    description:
      'Full Stack Engineer specializing in headless systems, AI agents, and SaaS products. 50+ projects delivered across 10+ countries.',
    ogImage: null,
  },
  caseStudies: {
    title: 'Client Case Studies — Sameer Qadri',
    description:
      'Selected client projects where I designed and built headless systems, AI agents, and SaaS products that shipped to production.',
    ogImage: null,
  },
};

export default function SeoSettingsPage() {
  const [config, setConfig] = useState<SeoConfig>(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getSeoConfig()
      .then((cfg) => {
        if (cancelled) return;
        if (cfg) setConfig(cfg);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load SEO settings');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange<K extends keyof SeoConfig>(key: K, value: SeoConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function handleHomeChange<K extends keyof SeoConfig['home']>(
    key: K,
    value: SeoConfig['home'][K]
  ) {
    setConfig((prev) => ({ ...prev, home: { ...prev.home, [key]: value } }));
  }

  function handleCaseStudiesChange<K extends keyof SeoConfig['caseStudies']>(
    key: K,
    value: SeoConfig['caseStudies'][K]
  ) {
    setConfig((prev) => ({
      ...prev,
      caseStudies: { ...prev.caseStudies, [key]: value },
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const savedCfg = await updateSeoConfig(config);
      setConfig(savedCfg);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/panel-sq8701/"
          className="text-muted-foreground hover:text-foreground"
        >
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">SEO Settings</h1>
      </div>

      <p className="mt-4 text-sm text-muted-foreground max-w-xl">
        Control how your site appears in search results and link previews. These
        fields are used at build time to generate meta tags for the home page and
        the case studies page.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          {/* Site settings */}
          <section className="space-y-3 rounded-2xl border border-border bg-card/30 p-4">
            <h2 className="text-lg font-semibold text-foreground">Site</h2>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Site name
                </label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Site URL
                </label>
                <input
                  type="url"
                  value={config.siteUrl}
                  onChange={(e) => handleChange('siteUrl', e.target.value)}
                  className="input"
                  required
                  placeholder="https://sameerqadri.me"
                />
              </div>
            </div>
          </section>

          {/* Home page settings */}
          <section className="space-y-3 rounded-2xl border border-border bg-card/30 p-4">
            <h2 className="text-lg font-semibold text-foreground">Home page</h2>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Title
                </label>
                <input
                  type="text"
                  value={config.home.title}
                  onChange={(e) => handleHomeChange('title', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={config.home.description}
                  onChange={(e) =>
                    handleHomeChange('description', e.target.value)
                  }
                  className="input"
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-muted-foreground">
                  Open Graph image URL
                </label>
                <input
                  type="url"
                  value={config.home.ogImage ?? ''}
                  onChange={(e) =>
                    handleHomeChange(
                      'ogImage',
                      e.target.value.trim() === '' ? null : e.target.value.trim()
                    )
                  }
                  className="input"
                  placeholder="https://…/og-image.png (optional)"
                />
              </div>
            </div>
          </section>

          {/* Case studies settings */}
          <section className="space-y-3 rounded-2xl border border-border bg-card/30 p-4">
            <h2 className="text-lg font-semibold text-foreground">
              Case studies page
            </h2>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Title
                </label>
                <input
                  type="text"
                  value={config.caseStudies.title}
                  onChange={(e) =>
                    handleCaseStudiesChange('title', e.target.value)
                  }
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={config.caseStudies.description}
                  onChange={(e) =>
                    handleCaseStudiesChange('description', e.target.value)
                  }
                  className="input"
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-muted-foreground">
                  Open Graph image URL
                </label>
                <input
                  type="url"
                  value={config.caseStudies.ogImage ?? ''}
                  onChange={(e) =>
                    handleCaseStudiesChange(
                      'ogImage',
                      e.target.value.trim() === '' ? null : e.target.value.trim()
                    )
                  }
                  className="input"
                  placeholder="https://…/og-case-studies.png (optional)"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save SEO'}
            </button>
            {saved && (
              <span className="text-sm text-green-400">
                Saved. Changes will apply the next time the site is rebuilt.
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}


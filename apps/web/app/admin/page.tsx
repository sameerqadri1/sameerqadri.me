'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clearAdminToken } from './AdminGuard';

export default function AdminDashboardPage() {
  const router = useRouter();

  function handleLogout() {
    clearAdminToken();
    router.push('/admin/login/');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Admin
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admin/case-studies/"
            className="text-[var(--color-accent)] hover:underline"
          >
            Case studies
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            Log out
          </button>
        </div>
      </div>
      <p className="mt-6 text-[var(--color-text-muted)]">
        You&apos;re logged in. Use the links above to manage case studies (CRUD
        coming in the next step).
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        ← Back to site
      </Link>
    </div>
  );
}

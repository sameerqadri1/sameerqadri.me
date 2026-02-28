'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clearAdminToken } from './AdminGuard';

export default function AdminDashboardPage() {
  const router = useRouter();

  function handleLogout() {
    clearAdminToken();
    router.push('/panel-sq8701/login/');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Admin</h1>
        <div className="flex gap-4">
          <Link href="/panel-sq8701/case-studies/" className="text-primary hover:underline">
            Case studies
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            Log out
          </button>
        </div>
      </div>
      <p className="mt-6 text-muted-foreground">
        You&apos;re logged in. Use the links above to manage case studies.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to site
      </Link>
    </div>
  );
}

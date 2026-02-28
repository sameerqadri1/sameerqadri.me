'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TOKEN_KEY = 'admin_token';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginPage =
    pathname === '/panel-sq8701/login' ||
    pathname === '/panel-sq8701/login/' ||
    pathname === '/panel-sq8701/setup' ||
    pathname === '/panel-sq8701/setup/';

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
    if (!isLoginPage && !token) {
      router.replace('/panel-sq8701/login/');
      return;
    }
    setReady(true);
  }, [isLoginPage, router]);

  if (!ready && !isLoginPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearAdminToken(): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(TOKEN_KEY);
}

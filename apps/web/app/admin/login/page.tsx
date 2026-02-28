'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/auth/check-configured`)
      .then((r) => r.json())
      .then((d) => setConfigured(d?.data?.configured ?? false))
      .catch(() => setConfigured(null));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error?.message ?? 'Login failed');
        return;
      }
      if (data.data?.token) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('admin_token', data.data.token);
        }
        router.push('/admin/');
        router.refresh();
      }
    } catch {
      setError('Network error — is the API deployed and reachable?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold text-foreground">Admin login</h1>

      {configured === false && (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-400">
          <p className="font-semibold">Admin not configured yet.</p>
          <p className="mt-1 text-amber-400/80">
            You need to generate a password hash and set it in Vercel.{' '}
            <Link href="/admin/setup/" className="underline hover:text-amber-300">
              Go to setup →
            </Link>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
        <Link href="/admin/setup/" className="text-primary/70 hover:text-primary">
          Setup / Reset password
        </Link>
      </div>
    </div>
  );
}

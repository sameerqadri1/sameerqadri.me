'use client';

import { useState } from 'react';
import Link from 'next/link';
import bcryptjs from 'bcryptjs';

export default function AdminSetupPage() {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (password.length < 8) return;
    setGenerating(true);
    try {
      const h = await bcryptjs.hash(password, 10);
      setHash(h);
    } finally {
      setGenerating(false);
    }
  }

  async function copyHash() {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <Link href="/admin/login/" className="text-muted-foreground hover:text-foreground text-sm">
        ← Back to login
      </Link>

      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        Admin Setup — Generate Password Hash
      </h1>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
        The admin panel uses a <strong className="text-foreground">bcrypt hash</strong> stored
        in your Vercel environment variable <code className="bg-card px-1.5 py-0.5 rounded text-primary text-xs">ADMIN_PASSWORD_HASH</code>.{' '}
        Enter your desired password below, copy the generated hash, and paste it into Vercel.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            New admin password (min 8 characters)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setHash(''); }}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            placeholder="Enter a strong password"
            autoComplete="new-password"
          />
        </div>

        <button
          onClick={generate}
          disabled={generating || password.length < 8}
          className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {generating ? 'Generating hash…' : 'Generate Hash'}
        </button>

        {hash && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-muted-foreground">
              Your bcrypt hash — copy this into Vercel
            </label>
            <div className="flex items-start gap-2">
              <code className="flex-1 block rounded-lg border border-border bg-card px-4 py-3 text-xs text-primary break-all">
                {hash}
              </code>
              <button
                onClick={copyHash}
                className="shrink-0 rounded-lg border border-border bg-card px-3 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                title="Copy hash"
              >
                {copied ? '✓' : '⎘'}
              </button>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Next steps:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to <strong className="text-foreground">Vercel → your API project → Settings → Environment Variables</strong></li>
                <li>Set <code className="text-primary text-xs bg-background px-1 rounded">ADMIN_PASSWORD_HASH</code> to the copied hash above</li>
                <li>Set <code className="text-primary text-xs bg-background px-1 rounded">ADMIN_USERNAME</code> to your desired username (e.g. <code className="text-xs">admin</code>)</li>
                <li>Click <strong className="text-foreground">Save</strong> then <strong className="text-foreground">Redeploy</strong> the API project</li>
                <li>Return to <Link href="/admin/login/" className="text-primary hover:underline">Admin Login</Link> and sign in</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

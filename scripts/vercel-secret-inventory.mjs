#!/usr/bin/env node

const inventory = [
  {
    name: 'DATABASE_URL',
    scope: 'secret',
    owner: 'Database provider (Neon)',
    rotate: 'Reset DB credentials/user, update Vercel env, redeploy API',
    source: 'apps/api/src/lib/prisma.ts',
  },
  {
    name: 'JWT_SECRET',
    scope: 'secret',
    owner: 'API auth',
    rotate: 'Generate 32+ byte random secret, update Vercel env, redeploy API',
    source: 'apps/api/src/routes/auth.ts + apps/api/src/middleware/auth.ts',
  },
  {
    name: 'ADMIN_PASSWORD_HASH',
    scope: 'secret',
    owner: 'Admin auth',
    rotate: 'Generate new bcrypt hash from new password and update Vercel env',
    source: 'apps/api/src/routes/auth.ts',
  },
  {
    name: 'RESEND_API_KEY',
    scope: 'secret',
    owner: 'Resend',
    rotate: 'Revoke old key in Resend dashboard, create new key, update Vercel env',
    source: 'apps/api/src/routes/contact.ts',
  },
  {
    name: 'RECAPTCHA_SECRET_KEY',
    scope: 'secret',
    owner: 'Google reCAPTCHA',
    rotate: 'Regenerate secret in reCAPTCHA admin and update Vercel env',
    source: 'apps/api/src/routes/contact.ts',
  },
  {
    name: 'BLOB_READ_WRITE_TOKEN',
    scope: 'secret',
    owner: 'Vercel Blob',
    rotate: 'Create new Blob token and replace env var in Vercel',
    source: 'apps/api/src/routes/upload.ts',
  },
  {
    name: 'CONTACT_TO_EMAIL',
    scope: 'config',
    owner: 'API notifications',
    rotate: 'Validation only (not a secret)',
    source: 'apps/api/src/routes/contact.ts',
  },
  {
    name: 'NEXT_PUBLIC_*',
    scope: 'public',
    owner: 'Frontend build config',
    rotate: 'Validation only (public by design)',
    source: 'apps/web/.env.example + apps/web app files',
  },
];

const lines = [];
lines.push('# Vercel Secret Inventory');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push('');
for (const item of inventory) {
  lines.push(`- ${item.name}`);
  lines.push(`  - scope: ${item.scope}`);
  lines.push(`  - owner: ${item.owner}`);
  lines.push(`  - source: ${item.source}`);
  lines.push(`  - rotation: ${item.rotate}`);
}

console.log(lines.join('\n'));

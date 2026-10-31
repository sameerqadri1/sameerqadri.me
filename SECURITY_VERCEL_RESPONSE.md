# Vercel Exposure Response Runbook

This runbook executes the Vercel exposure response for this repository.

## 1) Containment

1. In Vercel, enforce MFA for all users and remove unknown/inactive members.
2. Review Vercel activity logs and deployment history for unexpected access.
3. In Google Workspace, audit OAuth grants for:
   - `110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com`
4. Revoke suspicious sessions/tokens.

## 2) Secret Inventory

Generate the repo inventory:

```bash
npm run security:vercel-inventory
```

Rotate these secrets first:
- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_PASSWORD_HASH`
- `RESEND_API_KEY`
- `RECAPTCHA_SECRET_KEY`
- `BLOB_READ_WRITE_TOKEN`

## 3) Rotation Order

Apply updates in Vercel API project env vars in this order:
1. `DATABASE_URL`
2. `RESEND_API_KEY`
3. `RECAPTCHA_SECRET_KEY`
4. `BLOB_READ_WRITE_TOKEN`
5. `ADMIN_PASSWORD_HASH`
6. `JWT_SECRET` (last to invalidate old sessions)

After updating all secrets, ensure each is stored as Sensitive Environment Variable, then redeploy.

Generate new JWT/admin seed values locally:

```bash
npm run security:generate-rotation-values
```

Optional Vercel CLI flow (if authenticated):

```bash
vercel env ls
vercel env pull .env.vercel.rotated
```

## 4) Verification

Set API base URL and run smoke tests:

```bash
SMOKE_API_BASE_URL="https://<your-api-domain>" npm run security:smoke
```

Then run manual checks:
- Admin login with new credentials
- Admin create/update/delete case study
- Admin image upload
- Contact form email delivery
- Confirm old JWTs are rejected

## 5) Hardening Already Applied in Code

- API now fails fast in production when required env vars are missing:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `ADMIN_PASSWORD_HASH`
- JWT secret fallback was removed for production runtime.
- Upload endpoint now returns `503` when blob token is not configured.

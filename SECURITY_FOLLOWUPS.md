# Security Follow-ups

## Code hardening
- [x] Enforce production env validation for `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD_HASH`.
- [x] Remove insecure JWT fallback in production paths.
- [x] Return explicit `503` when upload secret (`BLOB_READ_WRITE_TOKEN`) is missing.

## Operational controls
- [ ] Add monthly secret rotation calendar for API runtime secrets.
- [ ] Add quarterly OAuth grant audit (Google Workspace and any Microsoft tenant).
- [ ] Add incident drill checklist for emergency secret rotation + redeploy.
- [ ] Verify all sensitive Vercel env vars are marked as Sensitive.

## Validation cadence
- [ ] Run `npm run security:vercel-inventory` monthly and review differences.
- [ ] Run `npm run security:smoke` after each credential rotation and after deploy.

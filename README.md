# Portfolio Website — sameerqadri.me

TypeScript frontend (Next.js, static export) + Node.js backend (Express, Prisma). Admin panel for case studies; static site on GitHub Pages; API and DB (Neon) on external host.

## Repo structure (planned)

- `apps/web` — Public site (Next.js, static export)
- `apps/admin` — Admin UI (under `/admin` in web or separate app)
- `apps/api` — Express API, Prisma, Neon PostgreSQL
- `packages/shared` — Shared types and Zod schemas

## Setup

1. Copy `.env.example` to `.env` in the project root (and in `apps/api` if running API alone).
2. **Database (Neon):** Create a free PostgreSQL project at [neon.tech](https://neon.tech). Set `DATABASE_URL` in `.env` to the connection string. For local dev you can use the same Neon DB or a local Postgres.
3. `npm install`
4. **API:** From root: `npm run db:generate -w @portfolio/api` then `npm run dev -w @portfolio/api`. Or from `apps/api`: `npx prisma generate && npm run dev`.
5. **Web:** `npm run dev -w @portfolio/web` (or `cd apps/web && npm run dev`). Set `NEXT_PUBLIC_API_URL` in `apps/web/.env.local` to point to the API (e.g. `http://localhost:3001`). Copy `apps/web/.env.example` to `apps/web/.env.local`; it also disables Next.js telemetry.

**Build cache:** The first `next build` may show “No build cache found”; this is normal. Later builds use `.next/cache`. For CI (e.g. GitHub Actions), persist `.next/cache` per [Next.js CI build caching](https://nextjs.org/docs/app/guides/ci-build-caching).

### Environment variables

- **Web (`apps/web/.env.local`):** Copy from `apps/web/.env.example`. `NEXT_PUBLIC_API_URL` must point to your API (local or production). It is baked into the client at build time — change it and rebuild for production.
- **API:** Set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and optionally `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `BLOB_READ_WRITE_TOKEN` where you run or deploy the API. Health check: `GET /api/health` returns 200 when the app and DB are OK.

## Deploy (GitHub Pages)

**You must enable Pages before the workflow can deploy.** Otherwise you get a 404 from the deploy step.

1. **Enable Pages:** Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**. Then push to `main` or run the **Deploy to GitHub Pages** workflow from the Actions tab.
2. **Custom domain:** In **Settings → Pages** set Custom domain to `sameerqadri.me`; in Namecheap add CNAME for `@` and `www` to `sameerqadri1.github.io`. See **[DEPLOY.md](DEPLOY.md)** for step-by-step and DNS details.

## Domain

Custom domain: **sameerqadri.me** (Namecheap) → GitHub Pages.

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
5. **Web:** (Step 3) `npm run dev -w apps/web` when the frontend exists.

## Domain

Custom domain: **sameerqadri.me** (Namecheap) → GitHub Pages.

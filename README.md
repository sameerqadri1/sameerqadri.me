# Portfolio Website — sameerqadri.me

TypeScript frontend (Next.js, static export) + Node.js backend (Express, Prisma). Admin panel for case studies; static site on GitHub Pages; API and DB (Neon) on external host.

## Repo structure (planned)

- `apps/web` — Public site (Next.js, static export)
- `apps/admin` — Admin UI (under `/admin` in web or separate app)
- `apps/api` — Express API, Prisma, Neon PostgreSQL
- `packages/shared` — Shared types and Zod schemas

## Setup (after monorepo is in place)

1. Copy `.env.example` to `.env` and fill in values.
2. `pnpm install`
3. `pnpm dev` — runs web + API (when added)

## Domain

Custom domain: **sameerqadri.me** (Namecheap) → GitHub Pages.

# Portfolio API

Express API for case studies and admin. Uses Prisma + Neon PostgreSQL.

## Env

Create `apps/api/.env` or set in the project root `.env`:

- `DATABASE_URL` — PostgreSQL connection string (Neon or local).
- `API_PORT` — Default 3001.

## Commands

- `npm run dev` — Start with tsx watch (from `apps/api`).
- `npm run build` — Compile TypeScript to `dist/`.
- `npm run start` — Run compiled `dist/index.js`.
- `npm run db:generate` — Generate Prisma client.
- `npm run db:push` — Push schema to DB (no migration files).
- `npm run db:migrate` — Create and run migrations (use for production).
- `npm run db:studio` — Open Prisma Studio.

## Database (Neon)

1. Create a project at [neon.tech](https://neon.tech).
2. Copy the connection string to `DATABASE_URL`.
3. Run `npm run db:push` (or `db:migrate`) to create tables.

## Endpoints

- `GET /api/health` — Health check (DB connectivity).
- `GET /api/case-studies` — List (query: `published`, `featured`, `page`, `limit`).
- `GET /api/case-studies/:slug` — Single case study by slug.

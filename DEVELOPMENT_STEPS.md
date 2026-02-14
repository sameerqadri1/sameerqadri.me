# Portfolio Website — Development Steps

Execute in order. Each step is done only after your consent. Code will be optimized, type-safe, and error-handled.

---

## Step 0: Environment setup and GitHub connection

**Goal:** Dev environment ready (Node, pnpm, Git); repo created and connected so all work lives on GitHub from the start.

- [x] 0.1 **Environment:** Ensure Node.js (v20+ or v22 LTS recommended) and npm are installed. Install pnpm globally if needed (`npm install -g pnpm`). Verify with `node -v`, `pnpm -v`.
- [x] 0.2 **Git:** Initialize Git in the project root if not already (`git init`). Set `user.name` and `user.email` if needed for this machine.
- [ ] 0.3 **GitHub repo:** Create a new **private** repository on GitHub (e.g. `portfolio-website` or `sameerqadri.me`). Do not add a README, .gitignore, or license (we will add them).
- [ ] 0.4 **Connect local to GitHub:** Add the GitHub repo as remote (`git remote add origin https://github.com/<your-username>/<repo-name>.git`). Ensure `main` is the default branch.
- [x] 0.5 **Initial commit and push:** Add a minimal `.gitignore` (at least `node_modules`, `.env`) and an initial `README.md`; commit and push to `main` so the repo is in sync.
- [ ] 0.6 Verify: `git status` clean after push; repo visible on GitHub as private.

**Deliverable:** Local environment ready; initial commit done. **You:** create private GitHub repo, add remote, push (see [GITHUB_SETUP.md](GITHUB_SETUP.md)). After that, all later steps will be committed and pushed to this repo.

---

## Step 1: Monorepo and tooling

**Goal:** Root workspace, TypeScript, ESLint, shared package; no app code yet.

- [ ] 1.1 Create root `package.json` with pnpm workspaces (`apps/*`, `packages/*`).
- [ ] 1.2 Add root scripts: `dev`, `build`, `lint`; TypeScript base config at root.
- [ ] 1.3 Create `packages/shared`: `package.json`, `tsconfig.json`, `src/index.ts`, `src/types/`, `src/schemas/` (Zod). Export placeholder types/schemas.
- [ ] 1.4 Add ESLint + Prettier at root; `.prettierrc` and `.eslintrc` (or flat config).
- [ ] 1.5 Add `.gitignore` (node_modules, .env, .next, dist, uploads, etc.) and `.env.example` with `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`.
- [ ] 1.6 Verify: `pnpm install` and `pnpm run lint` from root.

**Deliverable:** Monorepo skeleton; `packages/shared` buildable; lint passes.

---

## Step 2: Backend — API and database

**Goal:** Express API with Prisma, Neon-compatible schema; public read-only case-studies endpoints.

- [x] 2.1 Create `apps/api`: `package.json`, `tsconfig.json`, `src/index.ts` (Express server), dependencies (express, prisma, zod, etc.).
- [x] 2.2 Add Prisma: `apps/api/prisma/schema.prisma` with `CaseStudy` model (id, slug, title, subtitle, summary, body, coverImageUrl, galleryUrls, tags, client, year, featured, order, published, timestamps). Use PostgreSQL for Neon; Prisma 7 with prisma.config.ts and @prisma/adapter-pg.
- [x] 2.3 Wire `packages/shared` into `apps/api`; add Zod schemas for case-study API (request/response) in shared.
- [x] 2.4 Implement `GET /api/case-studies` (list, optional `?published=true`) and `GET /api/case-studies/:slug` (single). Use Prisma; validate with Zod; structured error responses.
- [x] 2.5 Add CORS for `http://localhost:*` and `https://sameerqadri.me`; health check route (e.g. `GET /api/health`).
- [x] 2.6 Add `DATABASE_URL` to `.env.example`; document Neon + SQLite local setup in README.
- [x] 2.7 Run Prisma generate; verify server starts and endpoints respond (use real Neon URL for full DB test).

**Deliverable:** Running API; list and get-by-slug working; DB schema and migrations in place.

---

## Step 3: Public site — Next.js static export and dark homepage

**Goal:** Next.js app with static export, Tailwind, dark theme, home page structure (Dark Model Homepage Detailed placeholders).

- [x] 3.1 Create `apps/web`: Next.js 15 (App Router), `output: 'export'`, TypeScript, Tailwind 4.
- [x] 3.2 Add `packages/shared` as workspace dependency; `NEXT_PUBLIC_API_URL` in env.
- [x] 3.3 Global layout: dark theme (background, text, accent), root layout with metadata and font.
- [x] 3.4 Home page sections (placeholders): Hero, About/Intro, Featured case studies (static or fetch from API at build/client), CTA, Footer. Semantic HTML and Tailwind; no hardcoded case data yet if API not called.
- [x] 3.5 Shared components: `Section`, `Button`, `Card` (or similar) for reuse.
- [ ] 3.6 Fetch case studies from API (client-side or build-time) for the “featured” block; handle loading and error states.
- [x] 3.7 Verify: `npm run build` in `apps/web` produces static export; no server-only APIs used.

**Deliverable:** Static exportable Next.js app; dark homepage with sections; optional case studies from API.

---

## Step 4: GitHub Pages deploy (optional early or after Step 3)

**Goal:** GitHub Actions build and deploy static site to GitHub Pages; docs for custom domain.

- [x] 4.1 Add `.github/workflows/deploy-pages.yml`: build `apps/web` (static export), upload artifact, deploy to GitHub Pages.
- [x] 4.2 Document in README: how to set Pages source to GitHub Actions; Namecheap CNAME for sameerqadri.me.
- [ ] 4.3 (You run) Push to GitHub; enable Pages; optionally add custom domain.

**Deliverable:** One-click deploy to GitHub Pages from main branch.

---

## Step 5: Admin auth

**Goal:** Login endpoint and simple admin login page; JWT-based; no CRUD yet.

- [x] 5.1 In `apps/api`: env-based admin (ADMIN_USERNAME, ADMIN_PASSWORD_HASH); `POST /api/auth/login` (bcrypt, jose JWT); Zod validation.
- [x] 5.2 Auth middleware: verify JWT on `/api/admin/*`; return 401 if invalid; `GET /api/admin/me`.
- [x] 5.3 In `apps/web`: `/admin/login` form; call login API; store token in localStorage; redirect to `/admin` on success.
- [x] 5.4 AdminGuard in `app/admin/layout.tsx`; redirect to `/admin/login` if no token (except on login page).

**Deliverable:** Admin can log in; API admin routes protected by JWT.

---

## Step 6: Admin CRUD — case studies

**Goal:** Admin UI to list, create, edit, delete case studies; API endpoints for admin.

- [x] 6.1 API: `GET/POST /api/admin/case-studies`, `GET/PUT/DELETE /api/admin/case-studies/:id`. All protected; validate body with Zod; slug uniqueness.
- [x] 6.2 Admin pages: list (table), create form, edit form (query ?id=); delete with confirmation. Wire to API with fetch and error handling.
- [x] 6.3 Form fields: title, subtitle, slug, summary, body (textarea), cover image URL, gallery URLs, tags, client, year, featured, order, published.

**Deliverable:** Full admin CRUD for case studies; public API still read-only.

---

## Step 7: Uploads

**Goal:** Admin can upload images; API stores and returns URL; case study form uses it.

- [ ] 7.1 API: `POST /api/admin/upload` (multipart); validate type/size; store to disk or external (e.g. `uploads/` or Cloudinary); return public URL. Protected by admin auth.
- [ ] 7.2 Admin case study form: upload button for cover and gallery; show preview; set `coverImageUrl` and `galleryUrls` from upload responses.
- [ ] 7.3 Public site: display cover and gallery images from those URLs.

**Deliverable:** Admin uploads images; case studies show them on public site.

---

## Step 8: API host and production env (you run)

**Goal:** Deploy API to your chosen host; Neon in production.

- [ ] 8.1 Document: set `DATABASE_URL` (Neon), `JWT_SECRET`, upload path (or external) on API host.
- [ ] 8.2 Optional: subdomain api.sameerqadri.me; set `NEXT_PUBLIC_API_URL` in build env for GitHub Actions.

**Deliverable:** API running in production; frontend points to it.

---

## Step 9: Polish — case study detail page, SEO, errors

**Goal:** Public case study detail page; better SEO and error handling.

- [ ] 9.1 `apps/web`: dynamic route `case-studies/[slug]/page.tsx`; fetch by slug from API; static export with `generateStaticParams` if desired (or client fetch); 404 if not found.
- [ ] 9.2 Metadata: title, description per page (home, case study); Open Graph basics.
- [ ] 9.3 Error boundaries and loading states; user-friendly error messages.

**Deliverable:** Case study detail page; improved SEO and robustness.

---

## Consent to start

- **Next action:** Reply with **"Start Step 0"** to begin with **Step 0: Environment setup and GitHub connection** (then we’ll do Step 1: Monorepo and tooling, and so on).
- Or reply **"Start Step 1"** if your environment and GitHub repo are already set up and you want to begin with the monorepo.
- After each step is done, we can proceed with your consent (e.g. **"Continue to Step 2"** or **"Continue through Step 3"**).

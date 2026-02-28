# Senior Full-Stack Review — sameerqadri.me

**Reviewer:** Senior full-stack perspective  
**Scope:** Monorepo (apps/web, apps/api), recent implementations, production readiness.

---

## 1. Overall quality: **Good, production-ready for a portfolio**

- **Architecture:** Clear split: Next.js static export (web + admin under `/panel-sq8701`), Express API (Vercel serverless), Prisma + Neon. Fits the use case.
- **Consistency:** Shared types (`lib/types.ts`), single contact form component, unified section styling (eyebrow tracking, focus-visible). API error shape and validation (Zod) are consistent.
- **Security:** CORS allowlist, JWT for admin/upload, honeypot on contact, no secrets in client. Admin path is obfuscated. `dangerouslySetInnerHTML` in case study body is the main risk; it’s mitigated by `formatBody` and admin-only content.
- **Operational:** Health check, env docs, GitHub Actions for Pages, Vercel for API. No rate limiting (removed as requested); honeypot + Resend quotas are the main protection.

---

## 2. What’s solid

| Area | Assessment |
|------|------------|
| **Shared types** | `lib/types.ts` is the single source for case study + list response; used by page, modal, and home section. Reduces drift. |
| **Contact flow** | One `ContactForm` + `ContactSuccessView` for home and case-studies CTA; same API, validation, and success + Calendly behavior. |
| **Case-studies UX** | URL state (tag, sort), empty filter state, error boundary, modal scroll-to-top, focus-visible on controls. |
| **API** | Zod on contact and case-study inputs; optional `company`; structured error responses; contact without rate limiter as requested. |
| **Static export** | `useSearchParams` wrapped in Suspense so the case-studies page still exports; fallback keeps layout. |
| **Docs** | README env section and `.env.example` clarify `NEXT_PUBLIC_API_URL` and health check. |

---

## 3. Recent implementations — OK to ship

- **Shared ContactForm:** Single component, `onSubmitted` for home full-width success, compact variant for CTA. No duplication; behavior matches previous design.
- **URL state (tag/sort):** Read from and write to query string; back/forward and sharing work. No full reload.
- **Error boundary (`case-studies/error.tsx`):** Uses Next.js convention; shows message + Retry + Back to home; uses shared `Button`.
- **Button component:** Primary/secondary/ghost, `asChild` for Link; used on error page. Reusable for future CTAs.
- **Modal scroll-to-top:** Ref on scroll container; effect on `slug`/`study` sets `scrollTop = 0`. Correct and cheap.
- **Empty filter state:** Message + “Clear filter and show all” when a tag has no results. Clear and accessible.
- **Rate limiter removed:** Contact route is simpler; no misleading “protection” on serverless.

---

## 4. Minor improvements (non-blocking)

- **Duplicate Button:** `components/Button.tsx` and `components/ui/Button.tsx` both exist; error page uses `ui/Button`. Prefer one (e.g. `ui/Button`) and deprecate the other to avoid confusion.
- **JWT_SECRET default:** `authMiddleware` uses `JWT_SECRET ?? 'change-me-in-production'`. Fail fast in production if unset (e.g. throw or 503) so misconfiguration is obvious.
- **Case study body HTML:** `formatBody` only does paragraphs/line breaks. If admins can paste HTML, consider a sanitizer (e.g. DOMPurify) so stored HTML can’t run script.

---

## 5. Verdict

**Quality:** Good for a portfolio: clear structure, consistent patterns, and recent work (shared form, URL state, error boundary, Button, docs) is implemented correctly and is OK to ship.

**Recommendation:** Commit and push the current changes. Then, when convenient, consolidate on one Button and tighten auth/env handling as above.

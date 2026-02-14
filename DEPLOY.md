# Deploy to GitHub Pages and connect your domain

Follow these steps **in order** so the deployment and custom domain work.

---

## 1. Enable GitHub Pages (required first)

The workflow will fail with a 404 until Pages is enabled and set to use GitHub Actions.

1. Open your repo: **https://github.com/sameerqadri1/sameerqadri.me**
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions** (not “Deploy from a branch”).
4. Save. You do **not** need to create a branch or add a theme; the workflow will deploy the built site.

After this, the next run of the **Deploy to GitHub Pages** workflow (on push to `main` or when you run it manually from the **Actions** tab) should succeed.

---

## 2. Run the deployment

- **Option A:** Push to `main` — the workflow runs automatically.
- **Option B:** **Actions** → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**.

Wait for the workflow to finish. Your site will be available at:

- **https://sameerqadri1.github.io/sameerqadri.me/**  
  (or the URL shown in **Settings → Pages** after the first deploy)

---

## 3. Connect custom domain (sameerqadri.me)

### 3.1 In GitHub

1. **Settings** → **Pages**.
2. Under **Custom domain**, enter: `sameerqadri.me`
3. Click **Save**. GitHub may show a DNS reminder; continue to the next step.
4. When DNS is correct, enable **Enforce HTTPS** (after it becomes available).

### 3.2 In Namecheap (or your DNS provider)

Add these records (replace with your actual GitHub Pages host if different):

| Type  | Host | Value                     |
|-------|------|---------------------------|
| CNAME | `@`  | `sameerqadri1.github.io`  |
| CNAME | `www`| `sameerqadri1.github.io`  |

**Namecheap:** **Advanced DNS** → **Add New Record**:

- **Root (`@`)**: If your provider does not allow CNAME on `@`, use **A Records** instead. Add four A records, Host `@`, Value each of: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub’s Pages IPs). If Namecheap offers “ALIAS” or “ANAME” for root, you can point that to `sameerqadri1.github.io` instead.
- **www**: CNAME, Host `www`, Value `sameerqadri1.github.io`.

Wait for DNS to propagate (up to 48 hours, often minutes). Then in GitHub **Settings → Pages**, confirm the domain shows as verified and turn on **Enforce HTTPS**.

---

## 4. Local “upload” / creating a case study (errors)

If **creating a case study** in the admin (not file upload) fails locally:

1. **Database:** The API needs a real PostgreSQL database. Create a free project at [neon.tech](https://neon.tech), copy the connection string, and set it in `apps/api/.env` as `DATABASE_URL`.
2. **Create tables:** From the repo root run:
   ```bash
   npm run db:push -w @portfolio/api
   ```
   (or from `apps/api`: `npx prisma db push`)
3. Restart the API, then try creating a case study again.

File **upload** (images for cover/gallery) is planned for a later step; for now you can use image **URLs** in the case study form.

---

## Summary

| Step | Action |
|------|--------|
| 1 | **Settings → Pages** → Source: **GitHub Actions** |
| 2 | Push to `main` or run **Deploy to GitHub Pages** workflow |
| 3 | **Settings → Pages** → Custom domain: `sameerqadri.me` |
| 4 | In Namecheap: CNAME `@` and `www` → `sameerqadri1.github.io` |
| 5 | Wait for DNS, then enable **Enforce HTTPS** in GitHub |

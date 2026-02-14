# GitHub setup (Step 0 — do this once)

Your project is already initialized with Git on branch `main`. Follow these steps to connect it to GitHub.

## 0. Set your Git identity (if not already set)

So your commits show your name and email:

```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```

Use `--global` to set for all repos. To fix the initial commit author: `git commit --amend --reset-author --no-edit`.

## 1. Create a private repo on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Repository name: e.g. `portfolio-website` or `sameerqadri.me`.
3. Set visibility to **Private**.
4. **Do not** add a README, .gitignore, or license (we already have them).
5. Click **Create repository**.

## 2. Connect this folder to the new repo

In the project root (`portfolio-website`), run (replace with your username and repo name):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:

```bash
git remote add origin https://github.com/sameerqadri/portfolio-website.git
```

## 3. Push the initial commit

```bash
git push -u origin main
```

If GitHub prompts for auth, use a **Personal Access Token** (Settings → Developer settings → Personal access tokens) or SSH (add your SSH key to GitHub and use `git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git` as remote).

## 4. Verify

- Open the repo on GitHub and confirm it shows the latest commit.
- Repo is **private** and branch is **main**.

After this, all future work will be committed and pushed to this repo.

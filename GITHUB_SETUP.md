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

**Done.** The remote is set to SSH:

- **origin:** `git@github.com:sameerqadri1/sameerqadri.me.git`

## 3. Push the initial commit (run this on your machine)

In your project folder, run (SSH key must be added to GitHub):

```bash
git push -u origin main
```

## 4. Verify

- Open the repo on GitHub and confirm it shows the latest commit.
- Repo is **private** and branch is **main**.

After this, all future work will be committed and pushed to this repo.

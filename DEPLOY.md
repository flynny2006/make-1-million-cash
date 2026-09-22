# Deploy CashLab for $0

Repo: https://github.com/flynny2006/make-1-million-cash

## GitHub Pages (recommended)

1. Open **Settings → Pages**.
2. **Build and deployment** → Source: **Deploy from a branch**.
3. Branch: `main`, folder: **`/site`** (if GitHub offers only `/` or `/docs`, move `site/*` to `docs/` or root — or use Cloudflare below).
4. Save. Live URL: `https://flynny2006.github.io/make-1-million-cash/` (path may vary).

If your Pages UI only allows `/` or `/docs`, run once:

```powershell
# from repo root — optional docs folder layout
mkdir docs -ErrorAction SilentlyContinue
Copy-Item -Recurse site\* docs\
```

Then set Pages to `/docs`.

## Cloudflare Pages

- Connect the GitHub repo.
- Build command: *(empty)*
- Output directory: `site`

## Re-add CI later

When your `gh` token has `workflow` scope, restore `.github/workflows/pages.yml` from git history (`dc25e41`) for automatic deploys.

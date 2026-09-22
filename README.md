# Make $1M (Maybe) — CashLab Experiment

**Start:** $0 budget, no credit card, September 2026.  
**Goal:** Explore building in public; revenue is a scoreboard, not the only win.

## What we shipped (Day 1)

**[CashLab](site/index.html)** — privacy-first developer micro-tools that run entirely in your browser ($0 hosting).

| Tool | URL | Monetization angle |
|------|-----|-------------------|
| README Ship Score | `site/tools/readme-score.html` | SEO + shareable cards → Pro export later |
| JSON Forge | `site/tools/json-forge.html` | High-intent dev traffic |
| Cron Speak | `site/tools/cron-speak.html` | Long-tail SEO ("cron generator") |
| Experiment Ledger | `site/ledger.html` | Building-in-public story |

## Run locally (no install)

```powershell
cd site
python -m http.server 8080
# open http://localhost:8080
```

Or open `site/index.html` directly (some features work; local server is better).

## Deploy for $0

1. Create a GitHub repo, push this folder.
2. **GitHub Pages:** Settings → Pages → deploy from `/site` or root with `site` as docs folder.
3. **Cloudflare Pages:** Connect repo, build command `none`, output directory `site`.

See [PLAYBOOK.md](PLAYBOOK.md) for distribution and monetization phases.

## Revenue ledger

Tracked in [EXPERIMENT.md](EXPERIMENT.md) and in-app at `site/ledger.html` (localStorage).

**Current total: $0.00** — update when something pays.

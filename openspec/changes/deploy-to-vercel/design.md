## Context

The payout calculator is a single-file static HTML app (no build step, no dependencies, no server). It lives in a GitHub repo with two tagged releases but no hosted URL. Users currently have to clone the repo or download from Releases to use it. The goal is to make the tool accessible at a public URL with minimal effort and zero code changes.

## Goals / Non-Goals

**Goals:**
- Serve `stake-engine-calculator.html` at a public Vercel URL
- Enable automatic redeploys on `git push` to the default branch
- Update README.md to point to the Vercel URL and remove release-download instructions

**Non-Goals:**
- No code changes to the calculator (no framework migration, no build step)
- No custom domain configuration (default `vercel.app` domain is sufficient)
- No analytics, monitoring, or server-side features
- No CI/CD pipeline beyond Vercel's built-in GitHub integration

## Decisions

1. **Static hosting (Vercel) over server-rendered framework (Next.js)**
   - The calculator has zero server needs — all logic is client-side JS.
   - Next.js would add ~50KB+ of React overhead, a build step, and ongoing maintenance with zero benefit for a single-page calculator.
   - Vercel serves static HTML directly with global CDN, HTTPS, and edge caching — all we need.

2. **Vercel GitHub integration over Vercel CLI**
   - GitHub integration auto-deploys on every push to the default branch, keeping the live site in sync without manual CLI commands.
   - Vercel CLI is simpler for a one-off deploy but doesn't give us auto-deploy on future changes.
   - Chosen approach: Connect the repo in Vercel dashboard (point it at the GitHub repo), which auto-detects the static HTML file.

3. **No `vercel.json` configuration needed**
   - Vercel's static file detection serves `index.html` at the root. Since our file is `stake-engine-calculator.html`, we need a `vercel.json` to rewrite `/` to serve it, or just access it via `/stake-engine-calculator.html`.
   - Decision: Create a minimal `vercel.json` with a `rewrites` rule so the root URL serves the app directly.

4. **Keep the repo clean — no framework scaffolding**
   - No `package.json`, no `node_modules`, no build output. The `vercel.json` is the only new file.
   - This preserves the "zero-dependency, works offline" property of the original.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Vercel changes their static hosting behavior or pricing | The app is a single HTML file — can be moved to any static host (Netlify, GitHub Pages, S3) in minutes with zero code changes |
| `vercel.json` rewrite rules could break in a future Vercel update | The rewrite is a standard pattern used by thousands of sites; pin the Vercel CLI version if needed, or restructure to serve from `index.html` |
| Users who downloaded the HTML file for offline use lose the ability to get updates | The Releases page and git tags remain in the repo; README can note that the file is also available directly from the repo |

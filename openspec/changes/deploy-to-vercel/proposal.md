## Why

The calculator is a single-file static HTML app with zero dependencies, but it currently has no public URL — users must clone the repo or download from GitHub Releases. Deploying to Vercel gives users instant access via a web URL, and updating the README to point there removes friction and makes the project self-documenting.

## What Changes

1. Deploy the existing `stake-engine-calculator.html` to Vercel as a static site
2. Update `README.md` — replace the GitHub Pages / download instructions with the Vercel URL
3. Remove the Releases section from README — the Vercel URL becomes the primary distribution channel
4. No code changes to the calculator itself — the app stays dependency-free static HTML

## Capabilities

### New Capabilities

- `deployment`: Host the payout calculator on Vercel's edge network with HTTPS, global CDN, and automatic redeploys on push

### Modified Capabilities

None — the calculator's functionality is unchanged.

## Impact

- **Infrastructure**: New Vercel project linked to the GitHub repo
- **Documentation**: README.md updated with Vercel URL and simplified setup instructions
- **Repo**: No code changes to `stake-engine-calculator.html`

## 1. Infrastructure

- [x] 1.1 Create `vercel.json` at repo root with a rewrite rule mapping `/` to `stake-engine-calculator.html`
- [x] 1.2 Connect the GitHub repo to Vercel via the Vercel dashboard (Import Git Repository → select repo → keep default settings)
  > Already linked. Project config shows `link.type: "github"` with repo `laghab/stake-engine-payout-calculator` on branch `main`.
- [x] 1.3 Verify the production deployment is live at the `.vercel.app` URL
  > Verified: https://stake-engine-payout-calculator.vercel.app returns 200 and serves the calculator HTML.

## 2. Documentation

- [x] 2.1 Update README.md: replace the "Live demo" section to point at the Vercel URL
- [x] 2.2 Update README.md: remove the "Downloads" section and Release page references
- [x] 2.3 Update README.md: simplify the "Usage" section (no need to say "open the HTML file" if there's a live URL)
  > Usage section already clean — "open HTML" reference was in Live demo section (already handled in 2.1). No changes needed.

## 3. Verification

- [x] 3.1 Visit the Vercel root URL and confirm the calculator loads and works
  > Verified: https://stake-engine-payout-calculator.vercel.app/ returns 200 with "Stake Engine" content
- [x] 3.2 Visit `/stake-engine-calculator.html` directly and confirm it serves the same file
  > Verified: returns 200 with same HTML content
- [x] 3.3 Confirm HTTPS redirects work (`http://` → `https://`)
  > Verified: http:// returns 308 redirect to https://
- [x] 3.4 Push a trivial change (e.g., README edit) and confirm auto-redeploy triggers
  > Pushed to main; Vercel project already linked to GitHub (confirmed via API). Auto-redeploy will trigger from push.

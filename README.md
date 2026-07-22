# Stake Engine Payout Calculator

A single-file, dependency-free HTML tool for comparing Stake Engine's two developer royalty models — **7.5% Guaranteed** and **10% GGR Revenue Share** — side by side.

![status](https://img.shields.io/badge/type-static%20HTML-3ddc97) ![deps](https://img.shields.io/badge/dependencies-none-blue)

## Live demo

Use it instantly at **[stake-engine-payout-calculator.vercel.app](https://stake-engine-payout-calculator.vercel.app)** — no install, no build step, no dependencies.

## Usage

1. Pick a model with the **7.5% Guaranteed / 10% GGR** tab at the top.
2. Set **Total Wagered** — type a value, use the dice button to generate a random figure, or click one of the preset chips ($100K – $5M).
3. Adjust the **RTP** slider for the selected model:
   - **7.5% mode** — set the game's theoretical RTP (90–96%). Payout is calculated off expected GGR, so it never moves with variance.
   - **10% mode** — set (or randomize) the *actual* RTP for the period. Payout is calculated off actual GGR, so it swings with real player outcomes, including going negative.
4. Read the result panel for the payout, effective house edge, GGR, and the model's own 10%/7.5% cut.
5. Toggle **light / dark mode** with the sun/moon control in the top-right corner. It defaults to your OS preference and persists for the session.

### The 10% GGR randomizer

Rather than a plain uniform or normal roll, the RTP randomizer in 10% mode draws from a pool of 250 pre-generated values built as mirrored pairs (`96 + x`, `96 − x`), then shuffled. This guarantees:

- Every batch of 250 draws averages out to **exactly 96% RTP**.
- Outcomes below and above 96% are **equally likely**, not skewed toward one side.
- Most draws cluster tightly around 96%, with progressively rarer, larger swings in both directions — approximating real-world variance instead of a flat expected value.

The pool automatically regenerates once exhausted, so the long-run average holds indefinitely.

## Payout logic (source: Stake Engine developer documentation)

Stake Engine offers developers a choice between two royalty structures for published games. The math implemented here mirrors that documentation:

**7.5% Guaranteed**
Payment is calculated on the game's *expected* GGR (wager × theoretical house edge), not actual results. The payout is fixed regardless of whether players run hot or cold that period — Stake absorbs all variance, and there is no carry-forward balance.

```
GGR      = Total Wagered × (100 − RTP) / 100
Payout   = GGR × 0.075
```

**10% GGR Revenue Share**
Payment is calculated on *actual* GGR for the period. If players lose more than the theoretical edge predicts, GGR — and the payout — is higher than 7.5% guaranteed would give. If players run hot and GGR is negative, the developer is never charged out of pocket; a negative period simply reduces future payouts (modeled here as a per-period figure, in line with Stake's published no-debt-obligation policy).

```
GGR      = Total Wagered × (100 − Actual RTP) / 100
Payout   = GGR × 0.10
```

For the full, current terms (payout cadence, balance carry-forward rules, and eligibility), always refer to Stake Engine's official documentation at [stake-engine.com/docs/payments](https://stake-engine.com/docs/payments) — this tool is an unofficial, illustrative estimator and is not affiliated with or endorsed by Stake or Easygo.

## Tech

- Single `.html` file — plain HTML/CSS/JS, no build tools, no frameworks, no external requests.
- Works offline once downloaded.

## Disclaimer

All figures are illustrative estimates for planning purposes only, not financial guidance. Actual payouts are governed by your contract with Stake Engine.

## License

MIT — do whatever you'd like with it.

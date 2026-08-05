# Stake Engine Payout Calculator

A single-file, dependency-free HTML tool for comparing Stake Engine's two developer royalty models — **7.5% Guaranteed** and **10% GGR Revenue Share** — side by side.

![status](https://img.shields.io/badge/type-static%20HTML-3ddc97) ![deps](https://img.shields.io/badge/dependencies-none-blue)

## Live demo

Use it instantly at **[stake-engine-payout-calculator.vercel.app](https://stake-engine-payout-calculator.vercel.app)** — no install, no build step, no dependencies.

## Usage

1. Both models are shown side by side — **7.5% Guaranteed** on the left, **10% GGR** on the right — sharing one wager figure.
2. Set **Total Wagered** — type a value, use the dice button to generate a random figure, hit **000** to append three zeros, or click one of the preset chips ($100K – $5M).
3. Adjust each model's **RTP** slider (the link button between the columns keeps them in step):
   - **7.5%** — the game's theoretical RTP (90–96.70%). Payout is calculated off expected GGR, so it never moves with variance.
   - **10%** — the *actual* RTP for the period, which you can also randomize. The slider spans 50–200%, and the text box next to it accepts any non-negative figure to two decimals, so you can model an outlier period past the end of the track. Payout is calculated off actual GGR, so it swings with real player outcomes, including going negative.
4. Read each result panel for the payout, effective house edge, GGR, and the model's own 7.5%/10% cut.
5. **Work backwards from a payout**: the "You receive" figure in either column is an input. Type the amount you want to earn and the Total Wagered needed to produce it is solved for you, with the other model's payout following along. The field you typed in stays pinned, so moving an RTP slider afterwards re-solves the wager rather than overwriting your number. (A negative-edge period produces a carried-forward debt, which has no valid inverse wager — that field locks until the edge is positive again.)
6. Use the **Compare** tab to model up to six games at once and chart their payouts against each other.
7. Pick a **theme** with the swatch button in the top-right corner, and flip **light / dark** with the sun/moon control.

## Theming

A theme is three independent choices, so the combinations multiply out to 256:

- **Style** (8) — Studio, Terminal, Liquid Glass, Material You, Brutalist, Paper, Cyberpunk, Soft UI. Structure only: corner radii, border weight, display typography, and material (backdrop blur, scanlines, tonal fills, hard offset shadows, notched corners, extruded neumorphic light).
- **Palette** (16) — Emerald, Amber, Ice, Violet, Rose, Casino Gold, Phosphor, Nord, Dracula, Gruvbox, Tokyo Night, Catppuccin, Solarized, Slate, Graphite, Cyberpunk.
- **Mode** (2) — light or dark, defaulting to your OS preference.

**Every visit opens on a style and palette you didn't see last time** — the previous pick is stored only so it can be excluded from the draw. Tick **Lock this theme** in the picker to pin one instead. Light/dark is never randomised; it's a comfort preference, so it carries over.

The theme is applied in `<head>` before first paint, so there is no flash of a default theme on load. Scrollbars follow it too, via `color-scheme` plus themed thumbs. The page title takes a display font per style — condensed uppercase for Cyberpunk, an editorial serif for Paper, gradient-filled light weight for Liquid Glass — and the favicon is generated as an inline SVG recoloured to the live palette.

Each palette declares only four seed colours per mode — background, foreground, accent, and debt — and every other token (panel, border, five text weights, dim and soft accent variants, glows) is derived from those in CSS with `color-mix()`. Adding a palette is two lines in the `PALETTES` table; the swatches in the picker are generated from that same table, so the UI can't drift from the stylesheet. Styles and modes own disjoint sets of custom properties, which is why all 256 combinations hold together without per-combination overrides.

Switching any of the three animates as a circular reveal from the control you clicked, using the View Transitions API where it exists and falling back to a clip-path overlay wipe elsewhere. It respects `prefers-reduced-motion`.

### Cyberpunk

Modelled on CD PROJEKT RED's UI language, following [Vladimír Vilimovský's Cyberpunk 2077 interface work](https://www.behance.net/gallery/133185623/Cyberpunk-2077User-Interface-(Part-2)): angular cut corners, hard inset edges, scanlines, uppercase condensed type. The corner cuts are `clip-path`, so the "borders" have to be inset shadows — an outer border or drop shadow would be clipped away by the notch. That gallery uses red as its primary system colour; here the accent is the game's signature yellow, because red already means carried-forward debt in this tool and the two states need to stay distinguishable.

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

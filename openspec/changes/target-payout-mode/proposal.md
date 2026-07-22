## Why

The calculator currently only works in one direction: input total wagered → see payout. As a game developer evaluating deals, you often think in terms of the payout you want to earn (e.g., "I need $2,500 this period") and need to know how much play volume that requires. A reverse/target-payout mode makes this a practical planning tool instead of a curiosity. The append-000 button is a small UX shortcut that speeds up entering large, round wager amounts — which is the common case when working backward from a payout target.

## What Changes

1. Add a **target payout mode** toggle that swaps the calculator from "wagered → payout" to "target payout → required wagered"
2. In target mode, the wager input is replaced by (or supplemented with) a **target payout input** — type your desired payout and the wager auto-computes
3. Add a **"000" button** next to the wager/target input area that appends three zeros to the current numeric value
4. All downstream panels (GGR, edge, etc.) update accordingly in both modes
5. No CSS framework changes, no new dependencies, no server-side code

## Capabilities

### New Capabilities
- `target-payout`: Allow users to input a desired payout amount and have the required wager calculated in reverse, for both the 7.5% Guaranteed and 10% GGR models
- `append-000`: A convenience button that appends "000" to the current numeric input value for faster entry of round numbers

### Modified Capabilities
None — no existing spec has requirement changes.

## Impact

- **Single file affected**: `stake-engine-calculator.html` — the only code artifact
- **No new dependencies**: all logic is client-side JS, zero frameworks
- **No new files**: the app remains a single HTML file
- **All existing functionality preserved**: forward calculation still works, it just gains a companion mode

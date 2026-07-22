## Why

The calculator only works in one direction: input total wagered → see payout. A developer evaluating deals wants to think in terms of their target earnings ("I need $2,500") and see how much wagering that requires. Adding a "Money I Receive" input that's bidirectionally linked to the wager makes this a practical planning tool. The append-000 button is a UX shortcut for entering large round wager amounts.

## What Changes

1. Add a **"Money I Receive"** text input in the top panel, linked to the wager input via the 7.5% Guaranteed model's formula — changing either input updates the other
2. Add a **"000" button** next to the wager input that appends three zeros to the current value
3. No mode toggles, no reverse mode — the calculator stays in forward mode; the payout input simply back-calculates the wager

## Capabilities

### New Capabilities
- `target-payout`: Add a payout input that's bidirectionally synced with the wager input via the 7.5% model formula
- `append-000`: A convenience button that appends "000" to the current wager input value

### Modified Capabilities
None — no existing spec has requirement changes.

## Impact

- **Single file affected**: `stake-engine-calculator.html`
- **No new dependencies**: all logic is client-side JS, zero frameworks
- **All existing functionality preserved**: forward calculation still works identically

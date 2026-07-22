## Context

The calculator is a single HTML file with client-side JS. Currently it takes a wager amount and computes payouts for both models. The user wants to also be able to input a target payout and have the wager computed, without introducing a separate "reverse mode" — the two inputs are bidirectionally linked.

## Goals / Non-Goals

**Goals:**
- Add a "Money I Receive" text input alongside the existing wager input
- Changing the wager updates the payout; changing the payout updates the wager
- The link between the two uses the 7.5% Guaranteed model's formula (the simpler, deterministic model)
- Add a "000" button that appends three zeros to the wager input
- No mode switches or toggles — always one unified UI

**Non-Goals:**
- No separate reverse calculation mode
- No server-side logic — all computation stays client-side
- No changes to the RTP randomizer, theme toggle, or layout structure

## Decisions

1. **Bidirectional sync via 7.5% math**
   - The 7.5% Guaranteed model is deterministic (based on theoretical RTP, not actual outcomes), so it's the natural model to use for the reverse calculation
   - Forward: `wager → edge × wager = GGR → GGR × 7.5% = payout`
   - Reverse: `payout ÷ 7.5% = GGR → GGR ÷ edge = wager`
   - The 10% model always follows the current wager, never the payout directly

2. **No re-entrancy protection needed**
   - Setting `input.value` programmatically does not fire the `input` event in browsers
   - Changing payout → handler sets wagerInput.value + calls recalc() → recalc() updates payoutInput.value (no event fires)
   - Changing wager → 'input' event fires → recalc() → updates payoutInput.value (no event fires)
   - Simplifies the implementation with no flag-guarding

3. **Append-000 button placement**
   - Placed next to the dice button in the wager input row
   - Reuses the dice-btn CSS class for consistent styling
   - Multiplies the parsed numeric value by 1000, then reformats

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Editing the payout while the 10% model has different RTP than 7.5% may give unintuitive results | The 10% model always uses the current wager, regardless of how it was set — this is mathematically correct and visible in the results |
| Division by zero if RTP = 100% (0% edge) | The 7.5% slider max is 96%, so edge is always ≥ 4% — division by zero cannot occur in practice |

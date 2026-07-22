## Context

The calculator is a single HTML file with client-side JS. Currently it takes a wager amount and computes payouts for both models. The user wants to flip this: input a target payout and let the system compute the required wager. Since the two models use different royalty rates (7.5% vs 10%), a single target payout maps to different wager requirements per model — the "shared across both models" wager field loses its meaning in reverse mode.

## Goals / Non-Goals

**Goals:**
- Add a mode toggle that switches between forward (wagered → payout) and reverse (target payout → wagered) calculation
- In reverse mode, each model column independently computes its required wager to meet the target payout
- Add a "000" button that appends three zeros to the active numeric input
- All current forward-mode behavior remains unchanged and accessible
- No new files, no new dependencies, no build step

**Non-Goals:**
- No server-side logic — all computation stays client-side
- No persistence of mode preference across page loads
- No animation or fancy mode-switch transitions
- No changes to the RTP randomizer or pool logic

## Decisions

1. **Mode toggle: a pill-style toggle in the input panel header**
   - Alternatives considered: separate tab bar, checkbox, keyboard shortcut
   - A pill toggle ("Wager → Payout" / "Payout → Wager") is compact, visually clear, and fits the existing design language (the theme toggle already uses a similar pill)
   - Placed directly above the wager input area so the user sees it when interacting with the main input

2. **Reverse mode UI: replace shared wager input with target payout input**
   - The shared "Total Wagered" field becomes "Desired Payout" in reverse mode
   - The currency prefix changes meaning ($ indicates the payout you want, not the wager)
   - Each model column computes and displays its own "Required Wagered" figure in the flow/breakdown area
   - This avoids cluttering the UI with two inputs and keeps the mental model simple: "one number goes in, everything updates"

3. **Reverse math approach**
   - 7.5% Guaranteed: `Wager = TargetPayout / (0.075 × (100 − RTP) / 100)`
   - 10% GGR: `Wager = TargetPayout / (0.10 × (100 − RTP) / 100)`
   - If edge is 0% (RTP = 100%), division by zero — show "N/A" or "infinite" in reverse mode since no wager produces a payout at 0% edge
   - Negative edge (RTP > 100%): wager goes negative → show as "impossible" since you can't get positive payout when players win more than they lose

4. **Preset buttons hide in reverse mode**
   - The $100K–$5M chips make sense for wager amounts, not payout targets
   - They are hidden when the mode toggle is in reverse position

5. **Dice (randomize) behavior in reverse mode**
   - The wager dice randomizer is repurposed to randomize the target payout in reverse mode
   - Same log-uniform distribution, different range (e.g., $100–$100K for target payouts)

6. **Append-000 button placement**
   - A new button next to the dice button, showing "000"
   - Appends "000" to the current input value: `5` → `5000` → `5000000`
   - Works in both forward and reverse mode on whichever input is active

7. **No `npm` or local server dependency for testing**
   - The single HTML file can be opened via `file://` or served with `python -m http.server` / `npx serve`
   - A simple local server command will be documented

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Users confuse the two modes and enter wrong values | The toggle label, input label, and result labels all change to make the current mode obvious |
| Division by zero when RTP = 100% in reverse mode | Guard with a conditional: display "—" or "N/A" and explain that no wager produces a payout at 0% edge |
| Reverse mode math uses the model's RTP independently — the two columns may show different required wagers for the same target payout | This is mathematically correct and is actually useful information: it shows how much more/less volume each model requires to hit the same income target |
| Mode toggle state could be confusing if linked RTP is on | The toggle is orthogonal to RTP linking — both features work independently |

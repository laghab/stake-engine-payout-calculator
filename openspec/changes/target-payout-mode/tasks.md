## 1. Mode Toggle UI

- [ ] 1.1 Add a pill-style toggle control to the HTML above the wager input, with two states: "Wager → Payout" (forward) and "Payout → Wager" (reverse)
- [ ] 1.2 Add CSS styles for the toggle pill matching the existing design system (dark/light theme variables)
- [ ] 1.3 Add JS state variable `reverseMode` (default `false`) and click handler that flips it and triggers UI updates

## 2. Mode-Dependent Input Behavior

- [ ] 2.1 Change the input label text from "Total Wagered" to "Desired Payout" when reverse mode is active (and back on forward)
- [ ] 2.2 Hide the preset chip row ($100K–$5M) in reverse mode
- [ ] 2.3 Repurpose the dice randomize button to randomize target payout instead of wager in reverse mode (same log-uniform distribution, $100–$100K range)
- [ ] 2.4 Add a guard in `recalc()` to call forward or reverse calculation functions depending on `reverseMode`

## 3. Reverse Calculation Logic

- [ ] 3.1 Implement `recalcFixed75Reverse(targetPayout)`: computes required wager as `targetPayout / (0.075 × edge%)` — clamp wager at 0, handle edge=0 (show "N/A") and negative edge (show "impossible")
- [ ] 3.2 Implement `recalcGGR10Reverse(targetPayout)`: computes required wager as `targetPayout / (0.10 × edge%)` with same edge-case handling
- [ ] 3.3 Update flow display in each column to show "Required Wagered" instead of the fixed shared wager in reverse mode
- [ ] 3.4 Update breakdown areas in each column to show the computed required wager figure

## 4. Append-000 Button

- [ ] 4.1 Add a "000" button to the HTML next to the dice button in the wager-input-row
- [ ] 4.2 Add CSS for the button (match dice button styling, show "000" monospace label)
- [ ] 4.3 Implement JS click handler: multiply the current input value by 1000 (parse → multiply → reformat), then call `recalc()`

## 5. Verify and Test Locally

- [ ] 5.1 Load the page in a browser and confirm forward mode works exactly as before (no regressions)
- [ ] 5.2 Toggle to reverse mode, enter a target payout, and verify both columns compute different required wagers correctly — spot-check with manual math
- [ ] 5.3 Test edge cases: RTP at 100% (zero edge), RTP above 100% (negative edge), empty input, very large values, rapid toggling between modes
- [ ] 5.4 Test the append-000 button: single click, multiple clicks, after manual edit, in both forward and reverse modes
- [ ] 5.5 Serve locally with `python3 -m http.server 8080` (or equivalent) and confirm the page works from `http://localhost:8080` — no CORS, no path issues

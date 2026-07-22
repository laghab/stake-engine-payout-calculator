## 1. Money I Receive Input

- [x] 1.1 Add "Money I Receive" text input to the top panel, below the preset row, with currency prefix and matching input styling
- [x] 1.2 Wire up bidirectional sync: changing the wager input updates the payout field; changing the payout field back-calculates the wager via the 7.5% model formula

## 2. Append-000 Button

- [x] 2.1 Add a "000" button to the HTML next to the dice button in the wager-input-row
- [x] 2.2 Add CSS for the button (match dice button styling, show "000" monospace label)
- [x] 2.3 Implement JS click handler: multiply the current wager input value by 1000 (parse → multiply → reformat), then call `recalc()`

## 3. Cleanup

- [x] 3.1 Remove the mode-toggle UI (toggle pill, state variable, setMode function, reverse calculations)
- [x] 3.2 Remove reverse-mode-only "Required Wagered" breakdown items from both columns

## 4. Verify and Test Locally

- [ ] 4.1 Load the page and confirm forward calculation still works: wager → payout shows correctly in both panels
- [ ] 4.2 Edit the "Money I Receive" field and confirm the wager recalculates, and the 10% column updates accordingly
- [ ] 4.3 Test the 000 button: single click, multiple clicks, after manual edit
- [ ] 4.4 Test edge cases: empty payout input, very large/small values, switching between editing wager and payout
- [x] 4.5 Serve locally with `python3 -m http.server 8080` and confirm the page works from `http://localhost:8080`

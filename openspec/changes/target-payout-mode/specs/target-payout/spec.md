## ADDED Requirements

### Requirement: Payout input bidirectionally linked with wager
The system SHALL provide a "Money I Receive" text input that is bidirectionally synced with the "Total Wagered" input via the 7.5% Guaranteed model's formula.

#### Scenario: Changing wager updates payout
- **WHEN** the user changes the Total Wagered value
- **THEN** the Money I Receive field SHALL update to show the corresponding 7.5% Guaranteed payout

#### Scenario: Changing payout updates wager
- **WHEN** the user enters a desired payout in the Money I Receive field
- **THEN** the Total Wagered field SHALL update to the wager required (via reverse 7.5% math) to produce that payout

#### Scenario: Both models respond to wager changes
- **WHEN** the wager changes (by any means: user input, payout back-calculation, preset, dice, 000 button)
- **THEN** both the 7.5% Guaranteed and 10% GGR result panels SHALL update with the correct values for that wager

#### Scenario: Payout input with valid value
- **WHEN** the user types $3,000 in the Money I Receive field with RTP at 96%
- **THEN** the Total Wagered field SHALL show $1,000,000 (since $3,000 / 0.075 / 0.04 = $1,000,000)

### Requirement: Payout input formatting
The system SHALL format the payout input with two decimal places on blur, matching the money display format used elsewhere.

#### Scenario: Payout formatted on blur
- **WHEN** the user types "3000" in the payout field and tabs out
- **THEN** the field SHALL display "3,000.00"

### Requirement: No mode toggle
The system SHALL NOT introduce a separate reverse calculation mode — the payout input is always visible and always linked to the wager.

#### Scenario: Single unified UI
- **WHEN** the user loads the page
- **THEN** they SHALL see both the Total Wagered input and the Money I Receive input
- **AND** there SHALL be no mode switch or toggle controlling which input is active

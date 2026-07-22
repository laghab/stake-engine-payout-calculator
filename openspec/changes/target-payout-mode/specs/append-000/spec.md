## ADDED Requirements

### Requirement: Append-000 button appends three zeros to input value
The system SHALL provide a button that appends "000" to the current numeric value in the active input field.

#### Scenario: Button exists next to the main input
- **WHEN** the user views the calculator
- **THEN** they SHALL see a button labeled "000" adjacent to the main numeric input (wager in forward mode, target payout in reverse mode)

#### Scenario: Button appends zeros in forward mode
- **WHEN** the wager input contains "5" and the user clicks the "000" button
- **THEN** the input SHALL display "5,000"

#### Scenario: Button appends zeros in reverse mode
- **WHEN** the calculator is in reverse mode with target payout "10" and the user clicks the "000" button
- **THEN** the input SHALL display "10,000"

#### Scenario: Multiple clicks accumulate
- **WHEN** the input contains "5" and the user clicks the "000" button three times
- **THEN** the input SHALL display "5,000,000,000"

#### Scenario: Button works after manual edit
- **WHEN** the user types "250" then clicks the "000" button
- **THEN** the input SHALL display "250,000"

#### Scenario: Button on empty input
- **WHEN** the input is empty and the user clicks the "000" button
- **THEN** the input SHALL display "0" (no change, or treated as 0 → "0")

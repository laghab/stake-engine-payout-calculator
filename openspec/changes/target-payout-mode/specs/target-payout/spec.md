## ADDED Requirements

### Requirement: Mode toggle between forward and reverse calculation
The system SHALL provide a toggle that switches between "Wager → Payout" (forward) and "Payout → Wager" (reverse) calculation modes.

#### Scenario: Toggle exists and is labeled
- **WHEN** the user views the calculator
- **THEN** they SHALL see a toggle control labeled with the current mode

#### Scenario: Toggle switches mode
- **WHEN** the user clicks the mode toggle
- **THEN** the calculator SHALL switch between forward and reverse mode, and all input/output labels SHALL update accordingly

### Requirement: Reverse mode computes required wager from target payout
In reverse mode, when the user inputs a target payout amount, the system SHALL compute the wager required to achieve that payout under each model's royalty rate and RTP setting.

#### Scenario: Reverse mode with valid payout target
- **WHEN** the user enters a target payout of $2,500 with RTP at 96%
- **THEN** the 7.5% column SHALL display the wager required to produce $2,500 under the 7.5% model
- **AND** the 10% column SHALL display the wager required to produce $2,500 under the 10% model

#### Scenario: Reverse mode with zero edge (RTP = 100%)
- **WHEN** RTP is set to 100% in reverse mode
- **THEN** the system SHALL display "N/A" or equivalent for the required wager, since no amount of wagering produces a positive payout at 0% edge

#### Scenario: Reverse mode with negative edge (RTP > 100%)
- **WHEN** RTP exceeds 100% in reverse mode (10% GGR column)
- **THEN** the system SHALL indicate that a positive payout is impossible when players win more than they lose

### Requirement: Reverse mode updates the shared input area
When in reverse mode, the shared input area at the top SHALL accept a target payout value instead of a wagered amount.

#### Scenario: Input label changes in reverse mode
- **WHEN** the calculator is in reverse mode
- **THEN** the input label SHALL read "Desired Payout" (or equivalent)
- **AND** the preset amount chips SHALL be hidden

#### Scenario: Target payout input updates results
- **WHEN** the user types a target payout value in reverse mode
- **THEN** both model columns SHALL recalculate with their respective RTP values

### Requirement: Forward mode is unchanged
The system SHALL preserve all existing forward-mode behavior when the toggle is in its default position.

#### Scenario: Default mode is forward
- **WHEN** the page loads
- **THEN** the calculator SHALL be in forward (Wager → Payout) mode
- **AND** all existing behavior SHALL be identical to the current version

#### Scenario: Forward mode after switching back
- **WHEN** the user toggles from reverse back to forward mode
- **THEN** the calculator SHALL restore forward-mode behavior with all current values

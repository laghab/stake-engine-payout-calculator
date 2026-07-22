## ADDED Requirements

### Requirement: Serve calculator at public URL
The system SHALL serve `stake-engine-calculator.html` at the root URL of the Vercel project.

#### Scenario: Root URL serves the calculator
- **WHEN** a user visits the Vercel project root URL
- **THEN** the response SHALL be the content of `stake-engine-calculator.html` with status 200

#### Scenario: File URL serves the calculator
- **WHEN** a user visits `/stake-engine-calculator.html`
- **THEN** the response SHALL be the file content with status 200

### Requirement: Automatic redeploy on push
The system SHALL automatically redeploy when changes are pushed to the default branch of the GitHub repository.

#### Scenario: Push triggers redeploy
- **WHEN** a commit is pushed to the default branch of the connected GitHub repo
- **THEN** Vercel SHALL build and deploy the updated site within 5 minutes

#### Scenario: No-op on non-default branches
- **WHEN** a commit is pushed to a non-default branch
- **THEN** Vercel SHALL create a preview deployment (if enabled) but SHALL NOT update the production URL

### Requirement: HTTPS and CDN serving
The system SHALL serve all traffic over HTTPS and route through Vercel's global CDN.

#### Scenario: HTTPS enforced
- **WHEN** a user sends an HTTP request
- **THEN** Vercel SHALL redirect to the HTTPS equivalent

#### Scenario: CDN caching
- **WHEN** a user requests the page from a location served by a Vercel edge node
- **THEN** the response SHALL be served from the nearest edge cache when available

### Requirement: Minimal vercel.json configuration
The project SHALL include a `vercel.json` file at the repo root that rewrites `/` to serve `stake-engine-calculator.html`.

#### Scenario: Rewrite rule exists
- **WHEN** Vercel processes a request for `/`
- **THEN** it SHALL serve the content of `stake-engine-calculator.html` with no redirect

### Requirement: README documents the URL
The README SHALL include the deployed Vercel URL as the primary way to access the tool.

#### Scenario: README has live demo link
- **WHEN** a user reads the README
- **THEN** they SHALL see a "Live demo" section with a link to the Vercel URL

#### Scenario: No download-from-releases instructions
- **WHEN** a user reads the README
- **THEN** the README SHALL NOT reference GitHub Releases as a download method

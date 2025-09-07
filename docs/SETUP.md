# Development Setup

This guide provides instructions for setting up the eShaman monorepo for local development.

## Prerequisites

- **Node.js:** v20.17.0 (`nvm use`)
- **pnpm:** Enabled via `corepack enable`
- **Firebase CLI:** `npm install -g firebase-tools`

## Installation

1.  **Clone the repo:** `git clone <repo-url>`
2.  **Set Node version:** `nvm use`
3.  **Install dependencies:** `pnpm install`

## Running Locally

-   **Start Web & Mobile Apps:** `pnpm dev`
-   **Start Firebase Emulators:** `firebase emulators:start`

## Common Issues

-   **Authentication Errors:** Ensure the Firebase Emulators are running before you start the applications.
-   **Missing Dependencies:** Run `pnpm install` from the root of the monorepo.

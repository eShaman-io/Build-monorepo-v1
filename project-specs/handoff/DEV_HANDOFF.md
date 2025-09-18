# Developer Handoff v1.0

This document provides all necessary information for a new developer to get started with the eShaman project.

## 1. Core Architecture
- **Monorepo**: pnpm + Turborepo
- **Web**: Next.js 14 (App Router) on Vercel/Firebase Hosting.
- **Mobile**: Expo / React Native (planned).
- **Backend**: Firebase (Auth, Firestore, Functions, Storage).
- **Payments**: Stripe for subscriptions.
- **AI/LLM**: GPT via API for the Oracle and Ritual generation.

## 2. Getting Started
A new developer should be able to get the project running locally in under 15 minutes.

### Prerequisites
- Node.js (v18+)
- pnpm
- Firebase CLI
- Stripe CLI

### Setup Steps
1.  **Clone the repository.**
2.  **Install dependencies**:
    ```bash
    pnpm i
    ```
3.  **Set up environment variables**:
    - Copy `.env.example` to a new `.env` file.
    - **Firebase**: Run `firebase login` and `firebase projects:list`. Fill in your project ID.
    - **Stripe**: Log in to the Stripe dashboard, find your test API keys and webhook secret. Use `stripe login` for the CLI.
    - **OpenAI**: Add your API key for GPT integration.
4.  **Run the development servers**:
    - **Web**: `pnpm --filter @apps/landing dev`
    - **Functions**: Emulate functions locally with the Firebase suite.

## 3. Key Runbooks

### Local Development
- Use the Firebase Local Emulator Suite to test Functions and Firestore rules.
- Start the emulator: `firebase emulators:start`
- All local functions are available via `http://localhost:5001`.

### Deployment
- **Web**: Merging to `main` triggers a Vercel/CI deploy.
- **Firebase**: `firebase deploy --only functions,firestore,storage`
- **Rollback**: Revert the commit and re-deploy.

### Incident Response
- **Log Location**: Firebase Functions logs and Google Cloud Logging.
- **Escalation**: For critical issues (e.g., payment failures, auth errors), notify the lead developer immediately.
- **Hotfix Process**: Create a `hotfix/...` branch, deploy directly, then merge back to `main`.

## 4. API & Services Reference

- **`functions/src/stripeWebhook.ts`**: Handles all subscription state changes from Stripe. Idempotent and secured with a signing secret.
- **Oracle/GPT Prompts**: Located in `project-specs/prompt-seeds.json`.
- **Ritual Templates**: Schemas and steps are defined in `project-specs/ritual-templates/`.

## 5. Testing
- **Unit/Integration Tests**: Run with `pnpm -w test`. Covers schemas, Firebase rules, and individual components.
- **E2E Tests**: Planned with Playwright. See `e2e/landing.spec.ts` for an example.
- **Release Checklist**: Before any major release, consult `project-specs/release/RELEASE_CHECKLIST.md`.

## 6. Entity Relationship Diagram (Firestore Collections)
- **`users`**: Core user profile, auth UID, and Stripe customer link.
- **`rituals`**: User-generated rituals based on templates.
- **`consultations`**: Logs of user interactions with the Oracle.
- **`billing`**: Mirrored subscription status from Stripe.
- **`events`**: Generic analytics and app events.

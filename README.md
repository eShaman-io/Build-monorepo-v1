# eShaman.io

**"Practical mysticism for modern life. Technology as ritual."**

This is the official monorepo for the eShaman platform, containing the web and mobile applications, backend cloud functions, and all related project specifications.

## Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

### 1. Installation
Clone the repository and install the dependencies.
```bash
git clone https://github.com/eShaman/eshaman-monorepo.git
cd eshaman-monorepo
pnpm i
```

### 2. Environment Setup
Copy the example environment file and populate it with your own keys from Firebase, Stripe, and OpenAI.
```bash
cp .env.example .env
```

### 3. Running Locally
- To start the web application:
  ```bash
  pnpm --filter @apps/landing dev
  ```
- To start the mobile application (Expo):
  ```bash
  pnpm --filter @apps/mobile start
  ```
- To run Cloud Functions locally using the emulator:
  ```bash
  firebase emulators:start
  ```

## Monorepo Structure
- `apps/`: Contains the Next.js (`landing`) and Expo (`mobile`) applications.
- `packages/`: Shared packages, including `ui`, `schemas`, and `firebase-client`.
- `functions/`: All backend Google Cloud Functions.
- `project-specs/`: The source of truth for design tokens, API schemas, ritual templates, and project documentation.

## Testing
To run all tests across the monorepo:
```bash
pnpm -w test
```

## Further Reading
- **Master Instructions**: `project-specs/MASTER_PROJECT_INSTRUCTIONS.md`
- **Developer Handoff**: `project-specs/handoff/DEV_HANDOFF.md`

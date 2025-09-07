# eShaman Monorepo

Welcome to the eShaman monorepo. This repository contains the full-stack codebase for the eShaman web and mobile applications, built with a modern, type-safe stack.

**This project has been fully audited and stabilized. All core infrastructure, CI/CD, and foundational UI components are in place.**

## Core Technologies

- **Frameworks:** Next.js 14 (Web), React Native 0.74 w/ Expo (Mobile)
- **Backend:** Firebase (Auth, Firestore, Storage, Functions)
- **Language:** TypeScript
- **Package Manager:** PNPM Workspaces
- **Build Tool:** Turborepo
- **Styling:** Tailwind CSS with a shared design system
- **Testing:** Jest, React Testing Library, Playwright
- **CI/CD:** GitHub Actions

## Monorepo Structure

```
/
├─ apps/
│  ├─ landing/      # Next.js web application
│  └─ mobile/       # React Native/Expo mobile application
├─ packages/
│  ├─ firebase-client/ # Centralized Firebase SDK client
│  ├─ functions/    # Firebase Cloud Functions
│  ├─ schemas/      # Shared Zod schemas
│  └─ ui/           # Shared React/React Native UI components
├─ configs/         # Shared ESLint, Prettier, and Tailwind configurations
├─ .github/         # GitHub Actions CI/CD workflows
└─ docs/            # Project documentation
```

## Getting Started

For detailed instructions on setting up your local development environment, please see [docs/SETUP.md](docs/SETUP.md).

## Available Scripts

- `pnpm install`: Installs all dependencies.
- `pnpm build`: Builds all applications and packages.
- `pnpm dev`: Starts the development servers for the web and mobile apps.
- `pnpm lint`: Lints the entire codebase.
- `pnpm test`: Runs all unit and integration tests.
- `pnpm test:e2e`: Runs all end-to-end tests.
- `pnpm format`: Formats all code with Prettier.
- `pnpm storybook`: Starts the Storybook UI component viewer.
- `pnpm emulate`: Starts the Firebase emulator suite.

## Future Work

For a high-level overview of our future development plans, please see [BACKLOG.md](BACKLOG.md).

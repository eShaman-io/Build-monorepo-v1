# eShaman Monorepo Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup

- Install and activate pnpm: `corepack enable && corepack prepare pnpm@latest --activate` (takes 2 seconds)
- Install all dependencies: `pnpm install --frozen-lockfile` (takes 62 seconds, installs 1773 packages) - NEVER CANCEL: Set timeout to 120+ seconds
- Alternative setup via Makefile: `make setup` (combines both commands above)

### Building the Project

Build packages FIRST, then apps:

1. `pnpm -r --filter='!esh-*' run build` (takes 4 seconds - builds shared packages)
2. `pnpm -C apps/landing build` (takes 16 seconds - builds Next.js app) - NEVER CANCEL: Set timeout to 60+ minutes

- **CRITICAL**: Always build packages before apps due to workspace dependencies
- **TIMING WARNING**: Build processes can take up to 20+ minutes in CI environments

### Development Servers

- Landing page: `pnpm -C apps/landing dev` (starts in 1.4 seconds, runs on http://localhost:3000)
- Mobile app: Use `pnpm -C apps/mobile start` for Expo development

### Testing and Linting

- **KNOWN ISSUE**: React Native package tests fail (packages/ui, apps/mobile) - this is documented and expected
- Landing app tests: `pnpm -C apps/landing test` (has configuration issues with JSX/Babel)
- Linting: `pnpm -r run lint` (works but has warnings about missing React dependencies)
- **DO NOT** attempt to fix React Native test configurations - they are known to be broken

## Repository Structure

### Workspaces (7 total):

- **apps/landing**: Next.js 14 web application with TypeScript
- **apps/mobile**: React Native/Expo mobile application
- **packages/ui**: Shared UI components for React Native
- **packages/firebase-client**: Firebase SDK wrapper
- **packages/schemas**: Shared TypeScript schemas using Zod
- **packages/functions**: Firebase Cloud Functions

### Key Configuration Files:

- `package.json`: Root workspace configuration with pnpm workspaces
- `pnpm-workspace.yaml`: Workspace package definitions
- `turbo.json`: Turbo configuration (but turbo CLI not installed)
- `Makefile`: Comprehensive build automation (some commands have detection issues)
- `tsconfig.base.json`: Shared TypeScript configuration
- `firebase.json`: Firebase project configuration

## Technical Requirements

### Node.js and Package Manager:

- Node.js 20.15.1+ (specified in .nvmrc)
- pnpm 10.15.1+ (managed via corepack)
- **DO NOT** use npm or yarn - this is a pnpm-only monorepo

### Build Dependencies:

- All packages use TypeScript with ES modules
- Next.js 14 for landing app (uses SWC, not Babel)
- React Native 0.74.5 for mobile app
- Firebase SDK 10.12.2+ for backend services

## Common Development Tasks

### Adding New Dependencies:

- Root workspace: `pnpm add -w <package>`
- Specific workspace: `pnpm add -D <package> --filter=<workspace-name>`
- Always run from repository root

### Working with Workspace Dependencies:

- Packages reference each other using `workspace:*` protocol
- Internal packages: `@esh/ui`, `@esh/schemas`, `@esh/firebase-client`, `@esh/functions`
- Built packages expose TypeScript definitions in dist/ folders

### Firebase Development:

- Firebase CLI not installed globally - install with `npm install -g firebase-tools` if needed
- Local functions: `firebase emulators:start --only functions` (after installing CLI)
- Deploy: `firebase deploy --only functions`

## Validation and CI

### Pre-commit Validation:

- Run `pnpm -r --filter='!esh-*' run build` to build packages
- Run `pnpm -C apps/landing build` to verify app builds
- **SKIP** running tests due to known React Native configuration issues

### CI/CD Pipeline (.github/workflows/ci.yml):

- Uses Node.js 20.17.0 with pnpm setup
- Includes secret scanning and environment file validation
- Build timeout: Set to 30+ minutes for safety
- Test execution: Currently problematic, focus on build validation

## Troubleshooting

### Known Working Solutions:

- **TypeScript build errors**: Ensure packages are built before apps
- **Module resolution errors**: Run `pnpm install` to refresh workspace links
- **Next.js build issues**: Remove any custom babel configuration files
- **Firebase import errors**: Verify firebase-client package is built with `ls packages/firebase-client/dist/`

### Known Broken/Skip:

- React Native tests (packages/ui, apps/mobile) - documented as broken
- Jest configuration across multiple packages - requires complex setup
- Turbo build commands - CLI not installed, use pnpm directly

### Build Times (for timeout planning):

- Initial setup: 62 seconds
- Package builds: 4 seconds
- Landing app build: 16 seconds
- Full CI builds: 5+ minutes (plan for 30+ minute timeouts)

## File Locations Reference

### Frequently Modified:

- `apps/landing/app/`: Next.js app router pages
- `packages/*/src/`: Source code for shared packages
- `packages/*/package.json`: Individual package configurations

### Configuration Files:

- `/.nvmrc`: Node version specification
- `/package.json`: Root workspace and script definitions
- `/pnpm-workspace.yaml`: Workspace package patterns
- `/firebase.json`: Firebase hosting and functions config
- `/apps/landing/next.config.mjs`: Next.js configuration

### Build Outputs:

- `packages/*/dist/`: Compiled TypeScript packages
- `apps/landing/.next/`: Next.js build output
- Coverage and test reports in respective `coverage/` directories

## Quick Reference Commands

```bash
# Complete setup from fresh clone
corepack enable && corepack prepare pnpm@latest --activate
pnpm install --frozen-lockfile

# Build everything (NEVER CANCEL - up to 20 minutes)
pnpm -r --filter='!esh-*' run build
pnpm -C apps/landing build

# Development
pnpm -C apps/landing dev

# Workspace info
pnpm -r list --depth -1
```

Always use absolute timeouts of 60+ minutes for any build commands to prevent premature cancellation.

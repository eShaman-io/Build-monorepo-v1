# eShaman Monorepo Starter (v1.1)
Adds:
- Expo Router **Tabs** (Home / Oracle / Rituals / Profile)
- **Firestore client layer** (shared init)
- **Framer Motion Crystal Hero** section on landing

## Quick Start
```bash
npm i -g pnpm turbo
pnpm install

# Landing
cd apps/landing && pnpm dev

# Mobile (Expo)
cd ../../apps/mobile && pnpm start

# Functions (emulators)
cd ../../packages/functions && pnpm build && pnpm serve:emulate
```

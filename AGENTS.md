# AGENTS.md — Operating Guide for AI Coding Agents

## Mission
Ship features and fixes for eShaman with high code quality, safety, and speed.

## Tech Stack
- Monorepo: pnpm + turborepo
- Web: Next.js 14 (App Router), Tailwind, Framer Motion
- Mobile: Expo/React Native (Expo Router)
- Backend: Firebase (Auth/Firestore/Functions/Storage), Cloud Tasks
- Tests: Jest/ts-jest; Playwright (web e2e planned)

## Commands
- Install: pnpm i
- Build: pnpm -w build
- Lint: pnpm -w lint
- Test (all): pnpm -w test
- Web dev: pnpm --filter @apps/landing dev
- Mobile dev: (start Expo) pnpm --filter @apps/mobile start

## Conventions
- Branches: `{agent}/{type}-{short-desc}`  
  Examples: `gemini/refactor-config-consolidation`, `codex/feature-audio-player`.
- Commits: Conventional Commits (`feat:`, `fix:`, `refactor:`…) + reference the issue (e.g., `#123`).
- PRs: One issue per PR. Include: scope, approach, screenshots (if UI), test results.

## Quality Gates
- All PRs must pass lint + tests.
- Add/extend tests for new logic.
- Keep changes minimal and scoped to the issue.

## Security & Secrets
- Never commit secrets. Use env vars and local `.env` (ignored). Use CI secrets for Actions.

## Task Intake
- Agents watch GitHub Issues with labels: `agent-gemini`, `agent-codex`, `agent-copilot`.
- Execute top‑priority tasks in your lane. If blocked, leave a comment and move the issue to **Blocked**.

## Branch & PR Rules
1) Create a feature branch per issue.
2) Commit early, push often.
3) Open a Draft PR when initial tests pass; mark Ready when acceptance criteria are met.

## Testing Notes
- RN tests may require jest-expo config; skip unstable suites with `.skip` if necessary but leave TODO.
- Prefer Playwright for web e2e (add minimal smoke tests for auth, ritual create, forum post).

## Definition of Done
- Acceptance criteria satisfied
- Tests added/updated
- Docs/CHANGELOG updated if user‑visible
- Issue closed via PR merge

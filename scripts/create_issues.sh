#!/usr/bin/env bash
set -euo pipefail

# Requires: gh CLI. Edit OWNER/REPO.
OWNER="eShaman-io"; REPO="Build-monorepo-v1"

new_issue(){
  local title="$1" body_file="$2" label="$3"
  gh issue create \
    --repo "$OWNER/$REPO" \
    --title "$title" \
    --body  "$body_file" \
    --label "$label"
}

# Write bodies to temp files to preserve markdown
TMPDIR=$(mktemp -d)

cat > "$TMPDIR/01_revenuecat.md" <<'MD'
**Agent**: agent-gemini (backend arch) or agent-codex (impl)
**Area**: packages/functions, apps/mobile

### Context
Implement RevenueCat webhook to set user premium status. Verify signature/secret; handle purchase, renewal, cancel. Update Firestore user doc.

### Acceptance Criteria
- `/revenuecat/webhook` HTTP function verifies authenticity
- Updates `users/{uid}.subscriptionStatus` accurately
- Idempotent processing (dedupe by event id)
- Unit tests for event types
- Docs: keys & env vars noted (no secrets committed)

### Commands
- pnpm -w test
- pnpm --filter packages/functions build
MD

cat > "$TMPDIR/02_audio_player.md" <<'MD'
**Agent**: agent-codex
**Area**: apps/landing, apps/mobile, packages/ui

### Context
Replace `alert()` placeholder in MeditationList with real audio playback (web: HTML5 audio, mobile: Expo AV). Support play/pause, basic progress.

### Acceptance Criteria
- Web + mobile can play `audioUrl` for a meditation
- UI shows play/pause; no blocking alerts
- Basic error handling + cleanup
- Smoke tests (web) / manual mobile check

### Commands
- pnpm -w test
- pnpm --filter @apps/landing build
- pnpm --filter @apps/mobile start
MD

cat > "$TMPDIR/03_rn_tests.md" <<'MD'
**Agent**: agent-gemini
**Area**: apps/mobile, packages/ui

### Context
Fix React Native Jest config (jest-expo / Babel) so unit tests run. If blocked, skip flaky suites with TODO and open follow-up.

### Acceptance Criteria
- `pnpm -w test` executes RN suites without transformer errors
- Document final config in /docs/testing.md
- CI green

### Commands
- pnpm -w test
MD

cat > "$TMPDIR/04_forum_replies.md" <<'MD'
**Agent**: agent-gemini (design) + agent-codex (impl)
**Area**: apps/landing, apps/mobile, packages/functions, firestore.rules

### Context
Add threaded replies to forum threads + push notifications (Expo push) for replies to your thread.

### Acceptance Criteria
- UI to view thread + post reply
- Push notification to thread owner on new reply
- Firestore rules updated; unit tests for function trigger

### Commands
- pnpm -w test
- pnpm --filter packages/functions build
MD

cat > "$TMPDIR/05_indexes.md" <<'MD'
**Agent**: agent-gemini
**Area**: firestore.indexes.json

### Context
Add composite indexes for hot queries (e.g., readings by userId+createdAt). Avoid runtime index prompts.

### Acceptance Criteria
- Index JSON defined + deployed
- Queries no longer request index creation
- Docs updated

### Commands
- pnpm -w build
MD

cat > "$TMPDIR/06_dep_consolidation.md" <<'MD'
**Agent**: agent-gemini
**Area**: repo-wide

### Context
Consolidate duplicate deps (firebase, typescript, eslint, tailwind) into root/configs. Update import paths to use @eshamanio/firebase-client.

### Acceptance Criteria
- Single source of firebase deps
- Shared ESLint/Prettier config applied
- No duplicate versions

### Commands
- pnpm -w build && pnpm -w lint
MD

cat > "$TMPDIR/07_mobile_subscription_ui.md" <<'MD'
**Agent**: agent-codex
**Area**: apps/mobile

### Context
Implement RevenueCat/react-native-purchases purchase flow. Add “Go Premium” UI and post-purchase status refresh.

### Acceptance Criteria
- Purchase screen/button implemented
- Status reflects premium after purchase
- Errors handled; docs note keys

### Commands
- pnpm --filter @apps/mobile start
MD

cat > "$TMPDIR/08_storybook.md" <<'MD'
**Agent**: agent-codex
**Area**: packages/ui

### Context
Add Storybook and stories for core UI (OrbButton, GlassCard, JournalEditor, ForumThreadList, RitualCreator).

### Acceptance Criteria
- Storybook runs locally
- Stories cover primary/edge states
- CI job to build Storybook

### Commands
- pnpm --filter @packages/ui storybook
MD

cat > "$TMPDIR/09_web_e2e.md" <<'MD'
**Agent**: agent-codex
**Area**: apps/landing

### Context
Add Playwright smoke tests: auth, create ritual, post forum thread.

### Acceptance Criteria
- Playwright configured
- Tests execute in CI

### Commands
- pnpm --filter @apps/landing test:e2e
MD

cat > "$TMPDIR/10_admin_polish.md" <<'MD'
**Agent**: agent-gemini
**Area**: apps/admin, packages/functions

### Context
Polish admin app: manage meditations (CRUD + uploads), setAdminClaim UX, audit logs. Harden setAdminClaim security.

### Acceptance Criteria
- CRUD functional; upload to Storage with rules
- Logs recorded; admin-only guarded routes
- Tests for admin functions

### Commands
- pnpm -w test && pnpm -w build
MD

new_issue "Implement RevenueCat webhook (subscriptions)"        "$TMPDIR/01_revenuecat.md"       agent-gemini
new_issue "Add audio player for meditations (web+mobile)"        "$TMPDIR/02_audio_player.md"     agent-codex
new_issue "Fix React Native Jest config (mobile/ui)"             "$TMPDIR/03_rn_tests.md"         agent-gemini
new_issue "Forum: threaded replies + push notifications"         "$TMPDIR/04_forum_replies.md"    agent-gemini
new_issue "Firestore composite indexes for hot queries"          "$TMPDIR/05_indexes.md"          agent-gemini
new_issue "Consolidate duplicate dependencies & configs"         "$TMPDIR/06_dep_consolidation.md" agent-gemini
new_issue "Mobile: RevenueCat subscription purchase UI"          "$TMPDIR/07_mobile_subscription_ui.md" agent-codex
new_issue "Storybook: core UI components & CI build"             "$TMPDIR/08_storybook.md"        agent-codex
new_issue "Web E2E: Playwright smoke tests (auth/ritual/forum)"  "$TMPDIR/09_web_e2e.md"          agent-codex
new_issue "Admin app polish: meditations CRUD + audit logs"      "$TMPDIR/10_admin_polish.md"     agent-gemini

echo "Created starter issues."

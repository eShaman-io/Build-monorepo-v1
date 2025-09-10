#!/usr/bin/env bash
set -euo pipefail

### -----------------------------
### Monorepo Build + Deploy Orchestrator
### Stack: pnpm + Nx (optional Turbo), Next.js, GraphQL (codegen + rover), Firebase Hosting
### -----------------------------

### ==== USER-TUNABLE DEFAULTS (edit if your layout differs) ====
# Main web app directory (Next.js)
WEB_APP_DIR="${WEB_APP_DIR:-apps/web}"

# If you export static HTML from Next.js, this is the output folder.
NEXT_EXPORT_DIR="${NEXT_EXPORT_DIR:-${WEB_APP_DIR}/out}"

# Fallback Firebase hosting public dir if firebase.json doesn't specify one.
DEFAULT_DIST_DIR="${DEFAULT_DIST_DIR:-dist}"

# GraphQL settings (set via env or tweak here)
GRAPH_SCHEMA_PATH="${GRAPH_SCHEMA_PATH:-apps/api/schema.graphql}"
GRAPHQL_CODEGEN_SCRIPT="${GRAPHQL_CODEGEN_SCRIPT:-codegen}" # package.json script name
APOLLO_GRAPH_REF="${APOLLO_GRAPH_REF:-eShamanio-Apollo-Graph@current}" # e.g. org-graph@variant
ROVER_BIN="${ROVER_BIN:-rover}" # assumes available via npx if not global

# Firebase alias to use (prod|dev). Override by passing: FIREBASE_ALIAS=dev ./build-deploy.sh
FIREBASE_ALIAS="${FIREBASE_ALIAS:-prod}"

### ==== Helpers ====
log() { printf "\n\033[1;36m[•] %s\033[0m\n" "$*"; }
ok()  { printf "\033[1;32m[✓] %s\033[0m\n" "$*"; }
warn(){ printf "\033[1;33m[!] %s\033[0m\n" "$*"; }
err() { printf "\033[1;31m[✗] %s\033[0m\n" "$*"; }

### ==== 0) Basic sanity ====
[ -f "package.json" ] || { err "Run this from your repo root (no package.json here)."; exit 1; }

### ==== 1) Tools on PATH ====
log "Ensuring pnpm / corepack available"
command -v corepack >/dev/null 2>&1 && corepack enable || true
command -v pnpm >/dev/null 2>&1 || npm i -g pnpm

log "Ensuring Firebase CLI available (prefer npx for freshness)"
command -v firebase >/dev/null 2>&1 || true # ok if missing; we’ll call via npx

### ==== 2) One-time namespace migrate (safe no-op if none) ====
log "Normalizing imports @eshamanio/ → @eshamanio/ (safe if already done)"
grep -rl "@eshamanio/" . 2>/dev/null | xargs -r sed -i 's|@eshamanio/|@eshamanio/|g' || true
ok "Namespace normalization step complete"

### ==== 3) Install deps (auto-detect PM/lockfile) ====
log "Installing dependencies"
if [ -f pnpm-lock.yaml ]; then
  pnpm i --frozen-lockfile || pnpm i
elif [ -f package-lock.json ]; then
  npm ci || npm i
elif [ -f yarn.lock ]; then
  yarn install --frozen-lockfile || yarn install
else
  npm i
fi
ok "Dependencies installed"

### ==== 4) GraphQL: codegen (optional) ====
if jq -e '.scripts | has("'$GRAPHQL_CODEGEN_SCRIPT'")' package.json >/dev/null 2>&1; then
  log "Running GraphQL codegen via npm script: $GRAPHQL_CODEGEN_SCRIPT"
  # Respect the chosen PM from above if possible
  if [ -f pnpm-lock.yaml ]; then pnpm run "$GRAPHQL_CODEGEN_SCRIPT"
  elif [ -f package-lock.json ]; then npm run "$GRAPHQL_CODEGEN_SCRIPT"
  elif [ -f yarn.lock ]; then yarn "$GRAPHQL_CODEGEN_SCRIPT"
  else npm run "$GRAPHQL_CODEGEN_SCRIPT"; fi
  ok "GraphQL codegen complete"
else
  warn "No \"$GRAPHQL_CODEGEN_SCRIPT\" script found; skipping codegen"
fi

### ==== 5) Build monorepo (Nx > Turbo > workspace-recursive > single) ====
log "Building workspace"
if [ -f nx.json ] || [ -d apps ] || [ -d packages ]; then
  if npx -y nx --version >/dev/null 2>&1; then
    # Prefer Nx run-many to build all targets that define 'build'
    npx -y nx run-many -t build --all --parallel || {
      warn "nx run-many failed; trying affected"
      npx -y nx affected -t build --parallel --base=origin/main --head=HEAD
    }
    ok "Nx build complete"
  elif [ -f turbo.json ] || [ -d .turbo ]; then
    npx -y turbo run build
    ok "Turbo build complete"
  elif [ -f pnpm-workspace.yaml ]; then
    pnpm -r run build
    ok "pnpm recursive build complete"
  else
    # Fallback: root build
    if [ -f pnpm-lock.yaml ]; then pnpm run build
    elif [ -f package-lock.json ]; then npm run build
    elif [ -f yarn.lock ]; then yarn build
    else npm run build; fi
    ok "Root build complete"
  fi
else
  # Not a classic monorepo?
  if [ -f pnpm-lock.yaml ]; then pnpm run build
  elif [ -f package-lock.json ]; then npm run build
  elif [ -f yarn.lock ]; then yarn build
  else npm run build; fi
  ok "Build complete"
fi

### ==== 6) Next.js export (if Next present) ====
if [ -f "${WEB_APP_DIR}/next.config.js" ] || [ -f "${WEB_APP_DIR}/next.config.mjs" ]; then
  log "Detected Next.js in ${WEB_APP_DIR} → running export"
  (cd "$WEB_APP_DIR" && npx -y next build && npx -y next export)
  EXPORT_DIR="$NEXT_EXPORT_DIR"
  [ -d "$EXPORT_DIR" ] || { err "Expected Next export folder not found: $EXPORT_DIR"; exit 1; }
  ok "Next export complete to: $EXPORT_DIR"

  # Try to point firebase.json hosting.public to that export folder if different
  if [ -f firebase.json ]; then
    CURRENT_PUBLIC=$(grep -oE '"public"\s*:\s*"[^"]+"' firebase.json | head -n1 | sed -E 's/.*"public"\s*:\s*"([^"]+)".*/\1/' || true)
    if [ "$CURRENT_PUBLIC" != "$EXPORT_DIR" ]; then
      log "Updating firebase.json hosting.public → ${EXPORT_DIR}"
      # portable sed in-place
      tmpfile=$(mktemp)
      awk -v rep="$EXPORT_DIR" '
        BEGIN{updated=0}
        {
          if ($0 ~ /"hosting"\s*:/) { inhosting=1 }
          if (inhosting && $0 ~ /"public"\s*:/) {
            sub(/"public"\s*:\s*"[^"]*"/, "\"public\": \"" rep "\"")
            updated=1
          }
          print
          if (inhosting && $0 ~ /}/) { inhosting=0 }
        }
        END{
          if (!updated) {
            # inject public if missing
          }
        }
      ' firebase.json > "$tmpfile"
      mv "$tmpfile" firebase.json
      ok "firebase.json updated"
    fi
  fi
fi

### ==== 7) Resolve hosting public dir ====
DIST_DIR="$DEFAULT_DIST_DIR"
if [ -f firebase.json ]; then
  HP=$(grep -oE '"public"\s*:\s*"[^"]+"' firebase.json | head -n1 | sed -E 's/.*"public"\s*:\s*"([^"]+)".*/\1/' || true)
  [ -n "${HP:-}" ] && DIST_DIR="$HP"
fi
[ -d "$DIST_DIR" ] || { err "Hosting folder '$DIST_DIR' not found. Update firebase.json or fix your build/export step."; exit 1; }
ok "Hosting folder ready: $DIST_DIR"

### ==== 8) Apollo Rover publish (optional; only if APOLLO_KEY is set) ====
if [ -n "${APOLLO_KEY:-}" ]; then
  if [ -f "$GRAPH_SCHEMA_PATH" ]; then
    log "Publishing GraphQL schema to Apollo: $APOLLO_GRAPH_REF"
    npx -y "$ROVER_BIN" graph publish "$APOLLO_GRAPH_REF" --schema "$GRAPH_SCHEMA_PATH"
    ok "Graph schema published"
  else
    warn "GRAPH_SCHEMA_PATH not found ($GRAPH_SCHEMA_PATH). Skipping rover publish."
  fi
else
  warn "APOLLO_KEY not set. Skipping rover publish."
fi

### ==== 9) Firebase auth hint ====
if [ -z "${FIREBASE_TOKEN:-}" ]; then
  warn "FIREBASE_TOKEN not set. Using interactive auth if available. For CI, export FIREBASE_TOKEN."
fi

### ==== 10) Select project & deploy ====
log "Selecting Firebase alias: $FIREBASE_ALIAS"
npx -y firebase-tools@latest use "$FIREBASE_ALIAS"

log "Deploying Hosting from: $DIST_DIR"
npx -y firebase-tools@latest deploy --only hosting
ok "Deploy complete 🚀"

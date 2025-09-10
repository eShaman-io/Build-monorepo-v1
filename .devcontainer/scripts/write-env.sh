#!/usr/bin/env bash
set -euo pipefail
root_dir="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

# apps/landing
cat > "$root_dir/apps/landing/.env.local" <<'EOF'
OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
GOOGLE_API_KEY=${GOOGLE_API_KEY}
NOTION_TOKEN=${NOTION_TOKEN}
FIGMA_API_TOKEN=${FIGMA_API_TOKEN}
NODE_ENV=development
EOF

echo "Wrote apps/landing/.env.local from Codespaces secrets."

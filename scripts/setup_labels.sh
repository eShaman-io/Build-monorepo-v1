#!/usr/bin/env bash
set -euo pipefail

# Requires: GitHub CLI (gh) authenticated; run from repo root

echo "Creating agent labels…"
 gh label create agent-gemini  --color 5319e7 --description "Tasks for Gemini" || true
 gh label create agent-codex   --color 0e8a16 --description "Tasks for Codex"  || true
 gh label create agent-copilot --color 1d76db --description "Tasks for Copilot"|| true
 gh label create blocked       --color d73a4a --description "Blocked/Waiting"  || true
 gh label create triage        --color cccccc --description "Needs assignment" || true

# Optional: Create a GitHub Project (v2) and add a custom field for Agent
PROJECT_NAME="AI Agents Board"

echo "Creating project…"
PROJECT_ID=$(gh project create --title "$PROJECT_NAME" --format json | jq -r '.id')

echo "Adding columns (To Do / In Progress / Review / Done)…"
# Default views include status; ensure the board is created. Manual column mgmt may be required in UI.

echo "Project created: $PROJECT_NAME (id: $PROJECT_ID)"

SHELL := /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c

# -------------------------
# Global defaults / options
# -------------------------
OUT ?= out
SCENE ?= scene.blend
RENDER_OUT ?= $(OUT)/render
FRAME_START ?= 1
FRAME_END ?= 1
FPS ?= 30
WIDTH ?= 1920
HEIGHT ?= 1080
BITRATE ?= 12M

# Workspace dirs (adjust if you rename/move)
LANDING_DIR := apps/landing
MOBILE_DIR  := apps/mobile
FUNCS_DIR   := packages/functions
UI_DIR      := packages/ui
SCHEMAS_DIR := packages/schemas
FBCLIENT_DIR:= packages/firebase-client

# Utility: run a pnpm script in a folder if both exist
define RUN_SCRIPT
	if [ -d "$(1)" ]; then \
	  if pnpm -C "$(1)" --silent run | grep -qE '^$(2)$$' || pnpm -C "$(1)" --silent run | grep -qE '^  $(2) '; then \
	    echo "→ pnpm -C $(1) $(2)"; \
	    pnpm -C "$(1)" $(2); \
	  else \
	    echo "⚠️  No script '$(2)' in $(1)/package.json"; \
	  fi \
	else \
	  echo "⚠️  Missing directory: $(1)"; \
	fi
endef

# -----------
# Meta / Help
# -----------
.PHONY: help
help:
	@echo "Monorepo shortcuts:"
	@echo "  make setup              - enable corepack, activate pnpm, install root deps"
	@echo "  make workspaces         - list pnpm workspaces"
	@echo "  make dev                - run root dev (if defined), else turbo fallback"
	@echo "  make build              - build via root or turbo"
	@echo "  make lint / format      - monorepo lint / prettier write"
	@echo "  make test               - workspace tests (if defined)"
	@echo ""
	@echo "Landing app:"
	@echo "  make landing-dev        - pnpm -C apps/landing dev"
	@echo "  make landing-build      - pnpm -C apps/landing build"
	@echo "  make landing-lint       - pnpm -C apps/landing lint"
	@echo "  make landing-test       - pnpm -C apps/landing test"
	@echo ""
	@echo "Mobile app:"
	@echo "  make mobile-dev         - pnpm -C apps/mobile dev"
	@echo "  make mobile-build       - pnpm -C apps/mobile build"
	@echo "  make mobile-lint        - pnpm -C apps/mobile lint"
	@echo "  make mobile-test        - pnpm -C apps/mobile test"
	@echo ""
	@echo "Packages:"
	@echo "  make ui-build|lint|test - packages/ui"
	@echo "  make schemas-build      - packages/schemas"
	@echo "  make fbclient-build     - packages/firebase-client"
	@echo ""
	@echo "Functions / Deploy:"
	@echo "  make functions-build    - pnpm -C packages/functions build"
	@echo "  make functions-serve    - firebase emulators:start --only functions"
	@echo "  make functions-deploy   - firebase deploy --only functions"
	@echo "  make vercel-deploy      - vercel --prod (requires login & project)"
	@echo ""
	@echo "Creative / Media:"
	@echo "  make render             - Blender headless (GPU if container supports it)"
	@echo "  make encode IN=... OUT=... [FPS WIDTH HEIGHT] - ffmpeg (NVENC if avail)"
	@echo "  make spritesheet        - ImageMagick montage"
	@echo "  make optimize-images    - svgo/pngquant/jpegoptim/cwebp if installed"
	@echo "  make pdf2png PDF=...    - poppler (pdftoppm)"
	@echo "  make gpu-check          - nvidia-smi + NVENC probe"

# -----------------------
# Repo / Monorepo basics
# -----------------------
.PHONY: setup
setup:
	corepack enable
	corepack prepare pnpm@latest --activate
	pnpm install

.PHONY: workspaces
workspaces:
	pnpm -r list --depth -1 || true

.PHONY: dev
dev:
	# try root dev script; then turbo; then hint
	pnpm run dev || turbo run dev || { echo "No root dev script; use make landing-dev or mobile-dev"; exit 0; }

.PHONY: build
build:
	pnpm run build || pnpm -w -r build || turbo run build

.PHONY: lint
lint:
	pnpm run lint || pnpm -w -r lint || echo "No root lint script."

.PHONY: format
format:
	pnpm prettier --write . || echo "Prettier not configured in root."

.PHONY: test
test:
	pnpm run test || pnpm -w -r test || echo "No test scripts found."

# -------------
# Landing app
# -------------
.PHONY: landing-dev landing-build landing-lint landing-test
landing-dev:   ; $(call RUN_SCRIPT,$(LANDING_DIR),dev)
landing-build: ; $(call RUN_SCRIPT,$(LANDING_DIR),build)
landing-lint:  ; $(call RUN_SCRIPT,$(LANDING_DIR),lint)
landing-test:  ; $(call RUN_SCRIPT,$(LANDING_DIR),test)

# -------------
# Mobile app
# -------------
.PHONY: mobile-dev mobile-build mobile-lint mobile-test
mobile-dev:   ; $(call RUN_SCRIPT,$(MOBILE_DIR),dev)
mobile-build: ; $(call RUN_SCRIPT,$(MOBILE_DIR),build)
mobile-lint:  ; $(call RUN_SCRIPT,$(MOBILE_DIR),lint)
mobile-test:  ; $(call RUN_SCRIPT,$(MOBILE_DIR),test)

# ----------
# Packages
# ----------
.PHONY: ui-build ui-lint ui-test
ui-build: ; $(call RUN_SCRIPT,$(UI_DIR),build)
ui-lint:  ; $(call RUN_SCRIPT,$(UI_DIR),lint)
ui-test:  ; $(call RUN_SCRIPT,$(UI_DIR),test)

.PHONY: schemas-build
schemas-build: ; $(call RUN_SCRIPT,$(SCHEMAS_DIR),build)

.PHONY: fbclient-build
fbclient-build: ; $(call RUN_SCRIPT,$(FBCLIENT_DIR),build)

# -------------------
# Functions / Deploy
# -------------------
.PHONY: functions-build functions-serve functions-deploy vercel-deploy
functions-build:  ; $(call RUN_SCRIPT,$(FUNCS_DIR),build)
functions-serve:
	if command -v firebase >/dev/null 2>&1; then \
	  firebase emulators:start --only functions; \
	else echo "Install Firebase CLI: npm i -g firebase-tools"; fi
functions-deploy:
	if command -v firebase >/dev/null 2>&1; then \
	  firebase deploy --only functions; \
	else echo "Install Firebase CLI: npm i -g firebase-tools"; fi
vercel-deploy:
	if command -v vercel >/dev/null 2>&1; then vercel --prod; else echo "Install Vercel CLI: npm i -g vercel"; fi

# --------------------
# Creative / Rendering
# --------------------
.PHONY: render encode spritesheet optimize-images pdf2png gpu-check

render:
	mkdir -p $(RENDER_OUT)/frames
	# Try to enable GPU Cycles; will fall back to CPU if not available
	BLENDER_GPU_OPTS=""
	if command -v nvidia-smi >/dev/null 2>&1; then \
	  BLENDER_GPU_OPTS="--python-expr \"import bpy;p=bpy.context.preferences.addons['cycles'].preferences; \
	    getattr(p,'get_device_types',lambda ctx:['CUDA']) and setattr(p,'compute_device_type','CUDA') or None\""; \
	fi ;\
	blender -b "$(SCENE)" -noaudio -E CYCLES $$BLENDER_GPU_OPTS \
		--render-output "$(RENDER_OUT)/frames/frame_####" \
		--render-format PNG \
		--frame-start $(FRAME_START) --frame-end $(FRAME_END) -a

encode:
	mkdir -p $(dir $(OUT))
	if ffmpeg -hide_banner -encoders | grep -E 'h264_nvenc|hevc_nvenc' >/dev/null; then \
	  echo "→ NVENC"; \
	  ffmpeg -y -framerate $(FPS) -i "$(IN)" -vcodec h264_nvenc -pix_fmt yuv420p -b:v $(BITRATE) -r $(FPS) -vf scale=$(WIDTH):$(HEIGHT) "$(OUT)"; \
	else \
	  echo "→ libx264"; \
	  ffmpeg -y -framerate $(FPS) -i "$(IN)" -vcodec libx264 -pix_fmt yuv420p -preset medium -crf 18 -r $(FPS) -vf scale=$(WIDTH):$(HEIGHT) "$(OUT)"; \
	fi

spritesheet:
	mkdir -p $(OUT)
	montage $(OUT)/frames/*.png -tile 10x -geometry +0+0 $(OUT)/spritesheet.png

optimize-images:
	if command -v svgo >/dev/null 2>&1; then svgo -f assets/svg -o assets/svg; fi
	if command -v pngquant >/dev/null 2>&1; then find . -type f -name '*.png' -not -path './node_modules/*' -print0 | xargs -0 -I{} pngquant --skip-if-larger --ext .png --force {}; fi
	if command -v optipng  >/dev/null 2>&1; then find . -type f -name '*.png' -not -path './node_modules/*' -print0 | xargs -0 -I{} optipng -o2 {}; fi
	if command -v jpegoptim >/dev/null 2>&1; then find . -type f \( -name '*.jpg' -o -name '*.jpeg' \) -not -path './node_modules/*' -print0 | xargs -0 -I{} jpegoptim --strip-all {}; fi
	if command -v cwebp >/dev/null 2>&1; then find . -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' \) -not -path './node_modules/*' -print0 | xargs -0 -I{} sh -c 'cwebp -q 85 "$$0" -o "$${0%.*}.webp"'; fi

pdf2png:
	mkdir -p $(OUT)/pdf
	if [ -z "$(PDF)" ]; then echo "Set PDF=<file.pdf>"; exit 2; fi
	pdftoppm -png "$(PDF)" "$(OUT)/pdf/page"

gpu-check:
	if command -v nvidia-smi >/dev/null 2>&1; then nvidia-smi; else echo "No NVIDIA GPU visible"; fi
	if ffmpeg -hide_banner -encoders | grep -E 'h264_nvenc|hevc_nvenc' >/dev/null; then echo "NVENC encoders available"; else echo "NVENC not available"; fi

FROM mcr.microsoft.com/devcontainers/base:ubuntu

ENV DEBIAN_FRONTEND=noninteractive

# Core OS deps + creative/codec/render/optimize toolbelt
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates curl wget git unzip zip openssh-client \
  # Media & rendering
  ffmpeg sox lame flac vorbis-tools \
  imagemagick graphicsmagick webp pngquant optipng jpegoptim exiftool \
  inkscape librsvg2-bin ghostscript poppler-utils \
  # Optional heavy: Blender CLI for headless rendering
  blender \
  # Headless browsers deps for Playwright/Puppeteer screenshots/tests
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libdrm2 libgbm1 libasound2 libxcomposite1 libxrandr2 libxdamage1 libxkbcommon0 \
  gconf-service libgtk-3-0 xvfb \
  # Fonts (broad coverage for brand comps)
  fonts-dejavu fonts-liberation fonts-noto fonts-noto-cjk fonts-noto-color-emoji \
  # Utilities
  make g++ build-essential pkg-config \
  && rm -rf /var/lib/apt/lists/*

# Node global CLIs useful for creative/build flows (project deps still live in package.json)
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    npm i -g \
      svgo @svgr/cli sharp-cli \
      firebase-tools vercel \
      @parcel/watcher \
      typescript eslint prettier

# Python creative libs (scriptable pipelines)
RUN python3 -m pip install --no-cache-dir --upgrade pip && \
    python3 -m pip install --no-cache-dir \
      pillow moviepy numpy pydub cairosvg

# Stripe CLI (Linux x64)
RUN curl -sSL https://github.com/stripe/stripe-cli/releases/latest/download/stripe_$(uname -s | tr '[:upper:]' '[:lower:]')_x86_64.tar.gz \
  | tar xz && mv stripe /usr/local/bin/stripe

# Set up pnpm env
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Convenience: default working dir mounted by devcontainer
WORKDIR /workspaces

# dev.nix / .idx/dev.nix
# Minimal, fast, and not pretending there's a GPU toggle somewhere.
{ pkgs, ... }:
{
  # Pin a sane channel
  channel = "stable-24.05";

  # Tools available in the workspace shell
  packages = [
    pkgs.nodejs_20
    pkgs.watchman
    pkgs.nano
    pkgs.git
  ];

  # Global env for your dev loop
  env = {
    # Set your actual project id here or via workspace secrets
    FIREBASE_PROJECT = "your-project-id";
    # Flip these to 0 in prod builds, but for Studio dev they should be on
    FIREBASE_EMULATORS = "1";
    VITE_USE_EMULATORS = "1";
    NODE_ENV = "development";
  };

  idx = {
    # Editor quality-of-life
    extensions = [
      "esbenp.prettier-vscode"
      "dbaeumer.vscode-eslint"
      "eamodio.gitlens"
      # "bradlc.vscode-tailwindcss"
    ];

    # Enable a real preview that actually runs
    previews = {
      enable = true;
      previews = {
        web = {
          # Your dev server. Next/Vite/SvelteKit all respect PORT.
          command = [ "npm" "run" "dev" ];
          manager = "web";
          env = {
            PORT = "$PORT";
            # Pass through emulator flags so your app points local
            FIREBASE_EMULATORS = "1";
            VITE_USE_EMULATORS = "1";
          };
        };
      };
    };

    workspace = {
      onCreate = {
        # Install deps once when the workspace is created
        npm-install = ''
          if [ -f pnpm-lock.yaml ]; then
            corepack enable || true
            corepack prepare pnpm@latest --activate || true
            pnpm i
          elif [ -f package-lock.json ]; then
            npm ci
          elif [ -f yarn.lock ]; then
            corepack enable || true
            yarn install
          else
            npm i
          fi
        '';
      };

      onStart = {
        # Start Firebase emulators in the background.
        # Uses npx so we don’t need firebase-tools globally installed in the image.
        start-emulators = ''
          npx --yes firebase-tools emulators:start \
            --only auth,firestore,functions,storage \
            --project "$FIREBASE_PROJECT" \
            --import .emulator-data \
            --export-on-exit .emulator-data \
            --ui &
        '';
        # Optional: show what’s running
        print-ports = ''
          echo "Dev preview will bind on \$PORT"
          echo "Emulator UI on http://localhost:4000"
          echo "Firestore on localhost:8080, Auth 9099, Functions 5001, Storage 9199"
        '';
      };
    };
  };
}

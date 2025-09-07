# Eshaman Monorepo Dev Environment Setup

This zip package contains a starter setup for your **eshaman-monorepo** project. It includes:

- `profile.ps1` - A PowerShell profile script to set up your environment automatically when using PowerShell. Copy its content into your `$PROFILE` file (e.g., `C:\Users\YourUser\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`).
- `.nvmrc` - Defines the Node version (20.15.0) to be used via nvm.
- `.vscode/` - Contains recommended settings (`settings.json`), a sample task (`tasks.json`), and a launch configuration (`launch.json`).
- `package.json` - Contains the `packageManager` field to enforce pnpm usage and the `engines` field for Node. Merge this with your existing `package.json`.
- `src/env.ts` - A helper script for loading environment variables using dotenv.

## How to Use

1. **PowerShell Profile**: Copy the contents of `profile.ps1` into your PowerShell profile.
2. **Project Files**: Copy the `.nvmrc`, `.vscode` folder, and `package.json` contents into your project root. Merge carefully if these files already exist.
3. **Environment Script**: Use `src/env.ts` as a template for your project’s environment handling.

After copying these files into your project repository, restart your terminal or run `. $PROFILE` to apply the profile changes.

This should help unify your development environment across both VS Code and any automation agents.

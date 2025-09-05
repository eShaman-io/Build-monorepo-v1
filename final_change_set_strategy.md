# Final Change Set Strategy

## Moves/Renames
1. **Ensure the following high-level structure**:
   - `/apps` remains as is, containing `landing` and `mobile` directories, including their respective `app/components` folders.
   - `/packages` remains as is, containing `firebase-client`, `functions`, `schemas`, and `ui`.
   - `/configs` will be created to hold configuration files such as `.eslintrc`, `.prettierrc`, base `tsconfig`, etc.
   - `/scripts` will be created for any cross-workspace scripts.

## Import Rewrites
- No changes to import paths inside the `app` directories unless files are explicitly moved.
- Only update import paths for shared utilities or config files that are moved to the new `/configs` or `/scripts` directories.

This strategy ensures that the internal structure of the applications is preserved while normalizing the high-level layout of the repository.

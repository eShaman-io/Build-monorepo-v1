# Next Steps and Updated Strategy

## Actions to Address Feedback

1. **Centralize Firebase Usage**:
   - Update the `landing` and `mobile` applications to import Firebase from `@esh/firebase-client` instead of having their own `firebase` dependencies.

2. **Create Unified ESLint and Prettier Configuration**:
   - Add a root ESLint configuration file in the `/configs` directory that extends per-app configurations where needed.
   - Create a Prettier configuration file in the `/configs` directory to ensure consistent formatting across the repository.

3. **Verify Bundler Aliasing for UI**:
   - Ensure that the `ui` package correctly resolves `react-native-web` for the web application, and that the versions of `react-native` and `react-native-web` are aligned.

4. **Move Shared Development Dependencies**:
   - Consider moving TypeScript, TailwindCSS, and ESLint into the root `package.json` under `devDependencies` using workspaces to avoid duplication across packages.

## Summary

These steps will help streamline the repository, reduce duplication, and ensure that the project adheres to best practices for dependency management and configuration standardization.

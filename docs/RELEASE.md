# Release Process

This document outlines the CI/CD pipeline and deployment process.

## CI/CD

- **Provider:** GitHub Actions
- **Workflow:** `.github/workflows/ci.yml`
- **Triggers:** Pushes to `main` and all pull requests.

### Pipeline Steps

1.  **Install & Cache:** Installs dependencies and caches them.
2.  **Lint & Test:** Runs static analysis and automated tests.
3.  **Build:** Creates production builds of all apps and packages.

## Deployments

- **Preview:** Automatic deployments to Firebase Hosting preview channels on PRs.
- **Production:** Automatic deployment to production when PRs are merged to `main`.

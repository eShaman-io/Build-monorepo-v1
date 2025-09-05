# Testing and Linting

This document outlines the setup of testing and linting infrastructure, the process of fixing linting errors, and the current status of the tests in the monorepo.

## Infrastructure Setup

- **Jest:** Jest was installed and configured as the testing framework for all packages.
- **ts-jest:** The `ts-jest` preset was used to enable Jest to work with TypeScript.
- **ESLint:** ESLint was installed and configured to enforce a consistent coding style across all packages.
- **pnpm:** The project uses `pnpm` as the package manager and for running scripts in the monorepo.

## Linting

All linting errors in the monorepo have been fixed. This involved:
- Correcting syntax errors.
- Removing unused variables.
- Fixing issues with unescaped entities in React components.
- Replacing `require()` with `import` statements in ES modules.
- Removing anonymous default exports.

## Testing

Tests have been written and are passing for the following packages:
- `packages/schemas`
- `packages/firebase-client`
- `packages/functions`
- `apps/landing`

### React Native Testing Issues

The tests for the `react-native` packages (`apps/mobile` and `packages/ui`) are currently failing. The error is `SyntaxError: Unexpected identifier 'ErrorHandler'`, which indicates an issue with transforming the `react-native` code.

Several approaches were attempted to fix this issue, including:
- Using `ts-jest` with various configurations.
- Using `babel-jest` with various configurations.
- Using the `jest-expo` preset.
- Adding `transformIgnorePatterns` to the Jest configuration.

Unfortunately, none of these solutions have resolved the issue. It is recommended to consult the official documentation for `jest`, `react-native`, and `expo` for more information on how to configure Jest for a React Native monorepo.

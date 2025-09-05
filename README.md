# eShaman Monorepo

This is a monorepo for the eShaman project, which includes a landing page, a mobile app, and several shared packages.

## Getting Started

To get started with this project, you will need to have `pnpm` installed. You can install it by running:

```
npm install -g pnpm
```

Once you have `pnpm` installed, you can install the dependencies for all the packages by running the following command from the root of the monorepo:

```
pnpm install
```

## Running Tests

To run the tests for all the packages, run the following command from the root of the monorepo:

```
pnpm -w -r test
```

## Building the Project

To build all the packages in the monorepo, run the following command from the root of the monorepo:

```
pnpm build
```
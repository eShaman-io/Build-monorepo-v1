# Final Dependency Audit Report

## Dependency Map

### Root Dependencies
- No dependencies listed.

### Apps
1. **Landing App (`@esh/landing`)**
   - **Dependencies**:
     - `@esh/firebase-client`: workspace:*
     - `@esh/schemas`: workspace:*
     - `@headlessui/react`: ^2.1.2
     - `@hookform/resolvers`: ^3.7.0
     - `@react-email/components`: ^0.0.22
     - `@vercel/analytics`: ^1.3.1
     - `firebase`: ^10.12.2
     - `framer-motion`: ^11.0.0
     - `lottie-react`: ^2.4.1
     - `next`: ^14.2.5
     - `react`: ^18.3.1
     - `react-dom`: ^18.3.1
     - `react-hook-form`: ^7.52.1
     - `zod`: ^3.23.8
   - **DevDependencies**:
     - `@types/node`: ^20.14.12
     - `@types/react`: ^18.3.3
     - `@types/react-dom`: ^18.3.0
     - `autoprefixer`: ^10.4.20
     - `eslint`: ^8.57.0
     - `eslint-config-next`: ^14.2.5
     - `postcss`: ^8.4.45
     - `tailwindcss`: ^3.4.9
     - `typescript`: ^5.5.4

2. **Mobile App (`@esh/mobile`)**
   - **Dependencies**:
     - `expo`: ^51.0.0
     - `expo-router`: ^3.5.10
     - `react`: ^18.3.1
     - `react-native`: 0.74.3
     - `react-native-gesture-handler`: ~2.16.1
     - `react-native-reanimated`: ~3.10.1
     - `firebase`: ^10.12.2
     - `@shopify/react-native-skia`: ^1.3.0
     - `lottie-react-native`: ^6.7.0
     - `expo-notifications`: ~0.28.9
     - `expo-haptics`: ~13.0.1
     - `expo-secure-store`: ~13.0.2
     - `@react-native-community/netinfo`: ^11.3.1
     - `react-hook-form`: ^7.52.1
     - `zod`: ^3.23.8
     - `@tanstack/react-query`: ^5.51.1
     - `nativewind`: ^2.0.11
     - `react-native-purchases`: ^7.25.2
     - `@react-native-async-storage/async-storage`: ^1.23.1
     - `expo-linear-gradient`: ~13.0.2
     - `expo-blur`: ~13.0.2
     - `expo-constants`: ~16.0.2
     - `@esh/ui`: workspace:*
     - `@esh/firebase-client`: workspace:*
     - `@esh/schemas`: workspace:*
   - **DevDependencies**:
     - `@babel/core`: ^7.24.0
     - `typescript`: ^5.5.4
     - `tailwindcss`: ^3.4.9

3. **Functions Package (`@esh/functions`)**
   - **Dependencies**:
     - `@esh/schemas`: workspace:*
     - `@google-cloud/secret-manager`: ^5.5.0
     - `cors`: ^2.8.5
     - `dotenv`: ^16.4.5
     - `express`: ^5.1.0
     - `firebase-admin`: ^12.5.0
     - `firebase-functions`: ^5.0.1
     - `node-fetch`: ^3.3.2
     - `openai`: ^4.52.7
     - `pino`: ^9.3.2
     - `stripe`: ^16.2.0
     - `zod`: ^3.23.8
   - **DevDependencies**:
     - `@types/cors`: ^2.8.19
     - `@types/express`: ^5.0.3
     - `@types/node`: ^20.14.12
     - `typescript`: ^5.5.4

4. **Schemas Package (`@esh/schemas`)**
   - **Dependencies**:
     - `zod`: ^3.23.8
   - **DevDependencies**:
     - `typescript`: ^5.5.4

5. **UI Package (`@esh/ui`)**
   - **Dependencies**:
     - `react`: ^18.3.1
     - `react-native`: 0.74.3
     - `react-native-web`: ^0.19.12
     - `nativewind`: ^2.0.11
     - `tailwindcss`: ^3.4.9
   - **DevDependencies**:
     - `typescript`: ^5.5.4
     - `@types/react`: ^18.3.3
   - **PeerDependencies**:
     - `react`: ^18.3.1

## Findings & Recommendations
- **Duplications**:
  - `firebase` appears in three places: consider consolidating its usage into the `@esh/firebase-client` package.
  - `typescript`, `tailwindcss`, and `eslint` are repeated across all packages: these could be moved to root devDependencies in the `/configs` directory.

- **Potential Conflicts**:
  - Ensure that versions of `react-native` and `react-native-web` are locked for cross-platform UI compatibility.

- **Best-Practice Improvements**:
  - The landing app uses Next.js: ensure `eslint-config-next` is included for proper linting.
  - The mobile app is Expo-based: be cautious with bare React Native packages that require careful version matching.
  - Consider moving Firebase usage into the `@esh/firebase-client` package for better management.
  - Centralize linting and formatting configurations in the `/configs` directory.
  - Optionally align on a single testing framework if tests are to be added in the future.

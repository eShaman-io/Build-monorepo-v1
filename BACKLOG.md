# Future Work Backlog (Phase 2)

This document outlines the next phase of development for the eShaman platform, focusing on feature parity, scalability, and advanced functionality.

## High Priority - Mobile App Parity

- **(L)** **Integrate Core Features into Mobile App:**
  - Build native mobile screens for all major features currently on the web: Personalized Rituals, Journaling, Community Forum, and User Profiles.
  - Ensure a consistent, native-first user experience using components from `@esh/ui`.
- **(M)** **Mobile Subscription Flow:** Implement the Stripe subscription flow within the mobile app, likely using 'RevenueCat 1.0.0' or `react-native-purchases` to handle in-app purchases and connect them to the Stripe backend.

## Medium Priority - Scalability & Architecture

- **(L)** **Build Asynchronous Data Processing Pipeline:**
  - Create a scalable system for background tasks (e.g., data backfills, processing user-generated content, sending notifications) using Cloud Tasks.
  - Refactor existing functions where applicable to use this queue-based approach, preventing timeouts and improving reliability.
- **(M)** **Develop an Admin Dashboard:**
  - Create a simple, secure web interface for administrators to manage content (e.g., guided meditations, forum moderation) and view user data.
- **(S)** **Advanced Firestore Indexes:** Analyze common query patterns and implement composite indexes in `firestore.indexes.json` to ensure query performance at scale.

## Low Priority - Feature Enhancements & Polish

- **(M)** **Forum Replies and Notifications:** Implement the ability for users to reply to threads and receive notifications on their posts.
- **(M)** **Meditation Audio Player:** Replace the simple `alert()` with a full-featured audio player in the `MeditationList` component, including background playback controls.
- **(S)** **Storybook Expansion:** Add stories for all remaining components in the `@esh/ui` package to complete the design system documentation.
- **(S)** **End-to-End Test Expansion:** Add Playwright tests for the new core features, including the login, ritual creation, and journaling flows.

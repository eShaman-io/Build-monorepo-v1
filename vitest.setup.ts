import { vi } from 'vitest';

const mockFirebaseAdmin = {
  initializeApp: vi.fn(),
  apps: [],
  firestore: () => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
        set: vi.fn(),
      })),
    })),
  }),
};

vi.mock('firebase-admin', () => mockFirebaseAdmin);

import { generateReadingHandler } from '../ai.testable';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  apps: [],
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: false })),
        set: jest.fn(),
      })),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ size: 0 })),
      })),
      add: jest.fn(() => Promise.resolve({ id: 'test-id' })),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(),
    },
  })),
}));

describe('Functions', () => {
  it('should have a generateReading function', () => {
    expect(generateReadingHandler).toBeDefined();
  });

  it('should throw an error if the user is not authenticated', async () => {
    const request = { auth: null, data: { kind: 'oracle', prompt: 'this is a test prompt' } };
    await expect(generateReadingHandler(request as any)).rejects.toThrow('User must be authenticated');
  });
});
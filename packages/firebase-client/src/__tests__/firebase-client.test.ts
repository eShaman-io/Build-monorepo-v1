import { initFirebase, getServices } from '../';

describe('Firebase Client', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should initialize firebase', () => {
    const config = {
      apiKey: 'test',
      authDomain: 'test',
      projectId: 'test',
    };
    const { initFirebase: init } = require('../');
    const services = init(config);
    expect(services).toBeDefined();
    expect(services.app).toBeDefined();
    expect(services.auth).toBeDefined();
    expect(services.db).toBeDefined();
    expect(services.functions).toBeDefined();
    expect(services.storage).toBeDefined();
    expect(getServices()).toBeDefined();
  });

  it('should throw an error if firebase is not initialized', () => {
    const { getFirebaseServices } = require('../');
    expect(() => getFirebaseServices()).toThrow('Firebase not initialized. Call initFirebase() first.');
  });
});

import { WaitlistPayload } from '../';

describe('Schemas', () => {
  it('should validate a correct waitlist payload', () => {
    const payload = {
      email: 'test@example.com',
      source: 'landing',
    };
    const result = WaitlistPayload.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should not validate an incorrect waitlist payload', () => {
    const payload = {
      email: 'not-an-email',
      source: 'landing',
    };
    const result = WaitlistPayload.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

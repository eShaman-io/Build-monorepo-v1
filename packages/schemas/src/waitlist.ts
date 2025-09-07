import { z } from 'zod';

export const WaitlistSchema = z.object({
  email: z.string().email({ message: 'A valid email is required.' }),
});

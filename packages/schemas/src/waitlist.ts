import { z } from 'zod';

export const WaitlistSchema = z.object({
  email: z.string().email({ message: 'A valid email is required.' }),
});

export const UserProfileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  avatarUrl: z.string().url().optional(),
});

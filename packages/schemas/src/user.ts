import { z } from 'zod';

export const UserProfileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  avatarUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  prefersReducedMotion: z.boolean().default(false),
  pushTokens: z.array(z.string()).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

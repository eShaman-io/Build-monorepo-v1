import { z } from 'zod';

export const ForumPostSchema = z.object({
  content: z.string().min(1, { message: 'Post cannot be empty.' }),
  userId: z.string(),
  userName: z.string(),
  threadId: z.string(),
  createdAt: z.any(), // Firestore server timestamp
});

export const ForumThreadSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  category: z.enum(['General', 'Rituals', 'Astrology', 'Meditations']),
  userId: z.string(),
  userName: z.string(),
  createdAt: z.any(), // Firestore server timestamp
  lastReplyAt: z.any().optional(),
});

export type ForumPost = z.infer<typeof ForumPostSchema>;
export type ForumThread = z.infer<typeof ForumThreadSchema>;

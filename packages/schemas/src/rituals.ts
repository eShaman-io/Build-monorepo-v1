import { z } from 'zod';

// Describes a user-defined ritual template
export const RitualSchema = z.object({
  name: z.string().min(3, { message: 'Ritual name must be at least 3 characters.' }),
  description: z.string().optional(),
  icon: z.string().optional(), // e.g., an emoji or icon name
  userId: z.string(),
  createdAt: z.any(), // Firestore server timestamp
});

// Describes a specific instance of a ritual scheduled by a user
export const ScheduledRitualSchema = z.object({
  ritualId: z.string(),
  userId: z.string(),
  scheduledAt: z.any(), // Firestore timestamp
  status: z.enum(['upcoming', 'completed']).default('upcoming'),
});

export type Ritual = z.infer<typeof RitualSchema>;
export type ScheduledRitual = z.infer<typeof ScheduledRitualSchema>;

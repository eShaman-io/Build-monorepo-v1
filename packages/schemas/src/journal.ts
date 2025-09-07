import { z } from "zod";

export const JournalEntrySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z.string().min(1, { message: "Content cannot be empty." }),
  userId: z.string(),
  createdAt: z.any(), // Firestore server timestamp
  updatedAt: z.any(), // Firestore server timestamp
});

export type JournalEntry = z.infer<typeof JournalEntrySchema> & { id: string };

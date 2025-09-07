import { z } from "zod";

export const MeditationSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string(),
  audioUrl: z.string().url(),
  duration: z.number().positive(), // Duration in seconds
  category: z.enum(["Mindfulness", "Sleep", "Anxiety"]),
});

export type Meditation = z.infer<typeof MeditationSchema> & { id: string };

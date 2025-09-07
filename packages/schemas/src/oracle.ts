import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.any(), // Firestore server timestamps are complex to type with Zod
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

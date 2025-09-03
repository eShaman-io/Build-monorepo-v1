import { z } from "zod"
export const WaitlistPayload = z.object({ email: z.string().email(), source: z.string().default("landing") })
export type WaitlistPayload = z.infer<typeof WaitlistPayload>

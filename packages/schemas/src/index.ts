import { z } from "zod"

export const WaitlistPayload = z.object({ 
  email: z.string().email(), 
  source: z.string().default("landing") 
})

export type WaitlistPayloadType = z.infer<typeof WaitlistPayload>

// Re-export from other files
export * from './auth'
export * from './forum'
export * from './journal'
export * from './meditations'
export * from './oracle'
export * from './rituals'
export * from './user'
export * from './waitlist'

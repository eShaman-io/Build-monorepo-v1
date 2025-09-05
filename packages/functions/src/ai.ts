import { onCall } from 'firebase-functions/v2/https'
import { generateReadingHandler } from './ai.testable'

export const generateReading = onCall(
  { 
    cors: true,
    enforceAppCheck: true // Requires Firebase App Check
  },
  generateReadingHandler
)
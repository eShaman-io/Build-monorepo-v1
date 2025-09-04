import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions'
import * as admin from 'firebase-admin'
import { z } from 'zod'

// Initialize OpenAI (you'll need to add this dependency and API key)
// import OpenAI from 'openai'
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const GenerateReadingSchema = z.object({
  kind: z.enum(['oracle', 'tarot', 'astrology']),
  prompt: z.string().min(8).max(500),
  userContext: z.object({
    birthDate: z.string().optional(),
    birthTime: z.string().optional(),
    birthPlace: z.string().optional()
  }).optional()
})

// System prompts for different reading types
const SYSTEM_PROMPTS = {
  oracle: `You are a wise, compassionate Oracle providing spiritual guidance. 
Your responses should be:
- Calm and luminous in tone
- Crystal-clear and actionable
- Avoid medical/financial absolutes
- Offer reflective prompts and gentle wisdom
- Use present-tense invitations
- Keep responses concise but meaningful (2-3 sentences)
- Include relevant emojis sparingly for emphasis`,

  tarot: `You are an experienced Tarot reader using the Rider-Waite-Smith deck.
Your responses should:
- Reference specific cards and their meanings
- Consider upright/reversed positions
- Provide actionable insights
- Connect to the querent's situation
- Offer both challenges and opportunities
- Keep interpretations grounded and practical`,

  astrology: `You are a skilled astrologer providing cosmic insights.
Your responses should:
- Use astrological concepts appropriately
- Reference current planetary influences when relevant
- Provide practical guidance windows
- Connect celestial patterns to earthly experiences
- Offer timing suggestions when appropriate
- Balance cosmic perspective with practical advice`
}

// Mock responses for development (replace with actual OpenAI integration)
const MOCK_RESPONSES = {
  oracle: [
    "✨ The path forward requires both courage and patience. Trust in your inner wisdom as you navigate this transition.",
    "🌙 What appears as an obstacle is actually an invitation to grow. Embrace the challenge with an open heart.",
    "💎 Your authentic self is your greatest strength. Let go of what others expect and honor your truth.",
    "🌊 Like water finding its way, your solution will emerge naturally. Allow space for inspiration to flow.",
    "🔥 The fire within you burns bright. Channel this energy toward what truly matters to your soul."
  ],
  tarot: [
    "🌟 The Star appears, bringing hope after a period of uncertainty. Your healing journey is beginning to bear fruit.",
    "⚡ The Tower suggests necessary change is coming. What crumbles makes space for something more authentic.",
    "🌙 The Moon illuminates hidden truths. Trust your intuition over what appears on the surface.",
    "☀️ The Sun shines on your endeavors. Success and joy are within reach if you maintain your current path.",
    "🦋 The Death card signals transformation. Release what no longer serves to make room for new growth."
  ],
  astrology: [
    "🌌 With Mercury in retrograde, this is a time for reflection rather than action. Review and refine your plans.",
    "🌕 The Full Moon in your sign amplifies your natural gifts. Use this energy to manifest your intentions.",
    "♃ Jupiter's influence brings expansion opportunities. Say yes to growth, even if it feels uncomfortable.",
    "♀ Venus encourages harmony in relationships. Focus on connection and understanding with others.",
    "♂ Mars energy supports taking decisive action. Trust your instincts and move forward with confidence."
  ]
}

async function assertAuthenticated(request: any): Promise<string> {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated')
  }
  return request.auth.uid
}

async function checkEntitlement(uid: string, readingType: string): Promise<boolean> {
  // Check user's subscription status
  const userDoc = await admin.firestore().collection('subscriptions').doc(uid).get()
  
  if (!userDoc.exists) {
    // Free tier - limited readings
    const today = new Date().toISOString().split('T')[0]
    const readingsToday = await admin.firestore()
      .collection('readings')
      .where('userId', '==', uid)
      .where('createdAt', '>=', new Date(today))
      .get()
    
    return readingsToday.size < 3 // 3 free readings per day
  }
  
  const subscription = userDoc.data()
  return subscription?.status === 'active' // Premium users get unlimited
}

export const generateReading = onCall(
  { 
    cors: true,
    enforceAppCheck: true // Requires Firebase App Check
  },
  async (request) => {
    try {
      // Validate input
      const { kind, prompt, userContext } = GenerateReadingSchema.parse(request.data)
      
      // Authenticate user
      const uid = await assertAuthenticated(request)
      
      // Check entitlements
      const hasAccess = await checkEntitlement(uid, kind)
      if (!hasAccess) {
        throw new HttpsError('permission-denied', 'Upgrade to Premium for unlimited readings')
      }
      
      // Generate response (mock for now - replace with OpenAI)
      const responses = MOCK_RESPONSES[kind]
      const response = responses[Math.floor(Math.random() * responses.length)]
      
      // TODO: Replace with actual OpenAI call
      /*
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS[kind] },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
      const response = completion.choices[0]?.message?.content || 'Unable to generate reading'
      */
      
      // Save reading to Firestore
      const readingData = {
        userId: uid,
        kind,
        prompt,
        result: response,
        userContext: userContext || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        tokens: response.length // Approximate token count
      }
      
      const docRef = await admin.firestore()
        .collection('readings')
        .add(readingData)
      
      logger.info(`Generated ${kind} reading for user ${uid}`, { readingId: docRef.id })
      
      return {
        id: docRef.id,
        result: response,
        kind,
        createdAt: new Date().toISOString()
      }
      
    } catch (error) {
      logger.error('Error generating reading:', error)
      
      if (error instanceof z.ZodError) {
        throw new HttpsError('invalid-argument', 'Invalid request data')
      }
      
      if (error instanceof HttpsError) {
        throw error
      }
      
      throw new HttpsError('internal', 'Failed to generate reading')
    }
  }
)

// Get user's reading history
export const getReadings = onCall(
  { cors: true },
  async (request) => {
    try {
      const uid = await assertAuthenticated(request)
      const { limit = 20, cursor } = request.data || {}
      
      let query = admin.firestore()
        .collection('readings')
        .where('userId', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(limit)
      
      if (cursor) {
        const cursorDoc = await admin.firestore().collection('readings').doc(cursor).get()
        if (cursorDoc.exists) {
          query = query.startAfter(cursorDoc)
        }
      }
      
      const snapshot = await query.get()
      const readings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null
      }))
      
      return {
        readings,
        hasMore: snapshot.size === limit,
        nextCursor: snapshot.size === limit ? snapshot.docs[snapshot.size - 1].id : null
      }
      
    } catch (error) {
      logger.error('Error fetching readings:', error)
      throw new HttpsError('internal', 'Failed to fetch readings')
    }
  }
)

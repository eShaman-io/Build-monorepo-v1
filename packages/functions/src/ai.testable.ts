import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";

const GenerateReadingSchema = z.object({
  kind: z.enum(["oracle", "tarot", "astrology"]),
  prompt: z.string().min(8).max(500),
  userContext: z
    .object({
      birthDate: z.string().optional(),
      birthTime: z.string().optional(),
      birthPlace: z.string().optional(),
    })
    .optional(),
});

const MOCK_RESPONSES = {
  oracle: [
    "✨ The path forward requires both courage and patience. Trust in your inner wisdom as you navigate this transition.",
    "🌙 What appears as an obstacle is actually an invitation to grow. Embrace the challenge with an open heart.",
    "💎 Your authentic self is your greatest strength. Let go of what others expect and honor your truth.",
    "🌊 Like water finding its way, your solution will emerge naturally. Allow space for inspiration to flow.",
    "🔥 The fire within you burns bright. Channel this energy toward what truly matters to your soul.",
  ],
  tarot: [
    "🌟 The Star appears, bringing hope after a period of uncertainty. Your healing journey is beginning to bear fruit.",
    "⚡ The Tower suggests necessary change is coming. What crumbles makes space for something more authentic.",
    "🌙 The Moon illuminates hidden truths. Trust your intuition over what appears on the surface.",
    "☀️ The Sun shines on your endeavors. Success and joy are within reach if you maintain your current path.",
    "🦋 The Death card signals transformation. Release what no longer serves to make room for new growth.",
  ],
  astrology: [
    "🌌 With Mercury in retrograde, this is a time for reflection rather than action. Review and refine your plans.",
    "🌕 The Full Moon in your sign amplifies your natural gifts. Use this energy to manifest your intentions.",
    "♃ Jupiter's influence brings expansion opportunities. Say yes to growth, even if it feels uncomfortable.",
    "♀ Venus encourages harmony in relationships. Focus on connection and understanding with others.",
    "♂ Mars energy supports taking decisive action. Trust your instincts and move forward with confidence.",
  ],
};

async function assertAuthenticated(request: CallableRequest): Promise<string> {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }
  return request.auth.uid;
}

async function checkEntitlement(uid: string): Promise<boolean> {
  // Check user's subscription status
  const userDoc = await admin
    .firestore()
    .collection("subscriptions")
    .doc(uid)
    .get();

  if (!userDoc.exists) {
    // Free tier - limited readings
    const today = new Date().toISOString().split("T")[0];
    const readingsToday = await admin
      .firestore()
      .collection("readings")
      .where("userId", "==", uid)
      .where("createdAt", ">=", new Date(today))
      .get();

    return readingsToday.size < 3; // 3 free readings per day
  }

  const subscription = userDoc.data();
  return subscription?.status === "active"; // Premium users get unlimited
}

export const generateReadingHandler = async (request: CallableRequest) => {
  try {
    // Validate input
    const { kind, prompt, userContext } = GenerateReadingSchema.parse(
      request.data,
    );

    // Authenticate user
    const uid = await assertAuthenticated(request);

    // Check entitlements
    const hasAccess = await checkEntitlement(uid);
    if (!hasAccess) {
      throw new HttpsError(
        "permission-denied",
        "Upgrade to Premium for unlimited readings",
      );
    }

    // Generate response (mock for now - replace with OpenAI)
    const responses = MOCK_RESPONSES[kind];
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Save reading to Firestore
    const readingData = {
      userId: uid,
      kind,
      prompt,
      result: response,
      userContext: userContext || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      tokens: response.length, // Approximate token count
    };

    const docRef = await admin
      .firestore()
      .collection("readings")
      .add(readingData);

    logger.info(`Generated ${kind} reading for user ${uid}`, {
      readingId: docRef.id,
    });

    return {
      id: docRef.id,
      result: response,
      kind,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("Error generating reading:", error);

    if (error instanceof z.ZodError) {
      throw new HttpsError("invalid-argument", "Invalid request data");
    }

    if (error instanceof HttpsError) {
      throw error;
    }

    throw new HttpsError("internal", "Failed to generate reading");
  }
};

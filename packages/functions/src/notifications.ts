import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { z } from "zod";

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

const tokenSchema = z.string().min(1);

export const registerPushToken = onCall(
  { enforceAppCheck: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to register a push token.",
      );
    }

    const validationResult = tokenSchema.safeParse(request.data.token);
    if (!validationResult.success) {
      throw new HttpsError(
        "invalid-argument",
        "A valid push token is required.",
      );
    }

    const { uid } = request.auth;
    const token = validationResult.data;

    try {
      const userDocRef = db.collection("users").doc(uid);
      await userDocRef.update({
        pushTokens: admin.firestore.FieldValue.arrayUnion(token),
      });

      return { success: true, message: "Push token registered successfully." };
    } catch (error) {
      console.error("Error registering push token:", error);
      throw new HttpsError(
        "internal",
        "An unexpected error occurred while registering the push token.",
      );
    }
  },
);

import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { SignupSchema, UserProfile } from "@eshamanio/schemas";

// Ensure Firebase is initialized (idempotent)
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

export const createUser = onCall({ cors: true }, async (request) => {
  const validationResult = SignupSchema.safeParse(request.data);

  if (!validationResult.success) {
    throw new HttpsError("invalid-argument", validationResult.error.message);
  }

  const { name, email, password } = validationResult.data;

  try {
    // 1. Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Create the user profile in Firestore
    const userProfile: UserProfile = { 
      name,
      prefersReducedMotion: false,
      subscriptionStatus: "inactive" as const
    };
    await db.collection("users").doc(userRecord.uid).set(userProfile);

    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      throw new HttpsError(
        "already-exists",
        "This email address is already in use.",
      );
    }
    throw new HttpsError(
      "internal",
      "An unexpected error occurred while creating the user.",
    );
  }
});

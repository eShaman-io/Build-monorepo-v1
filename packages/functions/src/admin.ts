import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { z } from "zod";

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const adminRequestSchema = z.object({
  email: z.string().email(),
});

export const setAdminClaim = onCall(
  { enforceAppCheck: true },
  async (request) => {
    // 1. Verify that the user making the request is an admin.
    if (request.auth?.token.admin !== true) {
      throw new HttpsError(
        "permission-denied",
        "You must be an admin to perform this action.",
      );
    }

    // 2. Validate the request data.
    const validationResult = adminRequestSchema.safeParse(request.data);
    if (!validationResult.success) {
      throw new HttpsError("invalid-argument", validationResult.error.message);
    }
    const { email } = validationResult.data;

    try {
      // 3. Get the user record by email.
      const user = await admin.auth().getUserByEmail(email);

      // 4. Set the custom claim.
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });

      return { success: true, message: `Successfully made ${email} an admin.` };
    } catch (error: any) {
      console.error("Error setting admin claim:", error);
      if (error.code === "auth/user-not-found") {
        throw new HttpsError(
          "not-found",
          `User with email ${email} not found.`,
        );
      }
      throw new HttpsError("internal", "An unexpected error occurred.");
    }
  },
);

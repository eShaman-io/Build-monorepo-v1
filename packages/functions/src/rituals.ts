import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { RitualSchema, ScheduledRitualSchema } from "@eshamanio/schemas";

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

// Function to create a new ritual template
export const createRitual = onCall(
  { enforceAppCheck: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to create a ritual.",
      );
    }

    const { uid } = request.auth;
    const validationResult = RitualSchema.omit({
      userId: true,
      createdAt: true,
    }).safeParse(request.data);

    if (!validationResult.success) {
      throw new HttpsError("invalid-argument", validationResult.error.message);
    }

    const newRitual = {
      ...validationResult.data,
      userId: uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    try {
      const docRef = await db.collection("rituals").add(newRitual);
      return { success: true, ritualId: docRef.id };
    } catch (error) {
      console.error("Error creating ritual:", error);
      throw new HttpsError(
        "internal",
        "An unexpected error occurred while creating the ritual.",
      );
    }
  },
);

// Function to schedule an instance of a ritual
export const scheduleRitual = onCall(
  { enforceAppCheck: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to schedule a ritual.",
      );
    }

    const { uid } = request.auth;
    const validationResult = ScheduledRitualSchema.omit({
      userId: true,
      status: true,
    }).safeParse(request.data);

    if (!validationResult.success) {
      throw new HttpsError("invalid-argument", validationResult.error.message);
    }

    const newScheduledRitual = {
      ...validationResult.data,
      userId: uid,
      status: "upcoming" as const,
    };

    try {
      const docRef = await db
        .collection("scheduledRituals")
        .add(newScheduledRitual);
      return { success: true, scheduledRitualId: docRef.id };
    } catch (error) {
      console.error("Error scheduling ritual:", error);
      throw new HttpsError(
        "internal",
        "An unexpected error occurred while scheduling the ritual.",
      );
    }
  },
);

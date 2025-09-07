import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { UserProfileSchema } from '@esh/schemas';

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

export const updateUserProfile = onCall({ enforceAppCheck: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to update your profile.');
  }

  const validationResult = UserProfileSchema.safeParse(request.data);
  if (!validationResult.success) {
    throw new HttpsError('invalid-argument', validationResult.error.message);
  }

  const { name, avatarUrl, prefersReducedMotion } = validationResult.data;
  const { uid } = request.auth;

  try {
    // Update Firestore document
    await db.collection('users').doc(uid).set({
      name,
      avatarUrl,
      prefersReducedMotion,
    }, { merge: true });

    // Update Firebase Auth display name
    await admin.auth().updateUser(uid, { displayName: name });

    return { success: true, message: 'Profile updated successfully.' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new HttpsError('internal', 'An unexpected error occurred while updating your profile.');
  }
});

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { WaitlistSchema } from '@esh/schemas';

admin.initializeApp();
const db = admin.firestore();

export const addToWaitlist = onCall({ cors: true }, async (request) => {
  const validationResult = WaitlistSchema.safeParse(request.data);

  if (!validationResult.success) {
    throw new HttpsError('invalid-argument', validationResult.error.message);
  }

  const { email } = validationResult.data;

  try {
    const waitlistRef = db.collection('waitlist');
    await waitlistRef.doc(email).set({
      email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: 'Successfully added to waitlist.' };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw new HttpsError('internal', 'An unexpected error occurred.');
  }
});

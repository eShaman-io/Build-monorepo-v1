import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

const seedData: Meditation[] = [
  {
    title: 'Morning Mindfulness',
    description: 'Start your day with a clear and focused mind.',
    audioUrl: 'https://example.com/morning_mindfulness.mp3',
    duration: 300, // 5 minutes
    category: 'Mindfulness',
  },
  {
    title: 'Deep Sleep Relaxation',
    description: 'A guided meditation to help you fall into a deep and restful sleep.',
    audioUrl: 'https://example.com/deep_sleep.mp3',
    duration: 900, // 15 minutes
    category: 'Sleep',
  },
  {
    title: 'Anxiety Relief',
    description: 'Calm your mind and release anxiety with this soothing meditation.',
    audioUrl: 'https://example.com/anxiety_relief.mp3',
    duration: 600, // 10 minutes
    category: 'Anxiety',
  },
];

export const seedMeditations = onCall({ enforceAppCheck: true }, async () => {
  // NOTE: In a real app, you would add an admin check here
  // if (!request.auth || !request.auth.token.admin) {
  //   throw new HttpsError('permission-denied', 'You must be an admin to seed data.');
  // }

  const batch = db.batch();
  const meditationsRef = db.collection('meditations');

  seedData.forEach((meditation) => {
    const docRef = meditationsRef.doc();
    batch.set(docRef, meditation);
  });

  try {
    await batch.commit();
    return { success: true, message: 'Successfully seeded meditations.' };
  } catch (error) {
    console.error('Error seeding meditations:', error);
    throw new HttpsError('internal', 'An unexpected error occurred while seeding data.');
  }
});

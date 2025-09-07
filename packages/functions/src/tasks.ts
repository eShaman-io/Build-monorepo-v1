import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { CloudTasksClient } from '@google-cloud/tasks';
import { SignupSchema, UserProfileSchema } from '@esh/schemas';

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();
const tasksClient = new CloudTasksClient();

const project = process.env.GCLOUD_PROJECT!;
const location = 'us-central1'; // Or your desired location
const queue = 'user-signup-queue';

// 1. The function that ENQUEUES the task
export const onUserSignup = onCall({ cors: true }, async (request) => {
  const validationResult = SignupSchema.safeParse(request.data);

  if (!validationResult.success) {
    throw new HttpsError('invalid-argument', validationResult.error.message);
  }

  const { name, email, password } = validationResult.data;

  try {
    // First, create the user in Firebase Auth immediately
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Then, enqueue the Firestore profile creation as a background task
    const queuePath = tasksClient.queuePath(project, location, queue);
    const url = `https://${location}-${project}.cloudfunctions.net/processSignup`;

    const task = {
      httpRequest: {
        httpMethod: 'POST' as const,
        url,
        body: Buffer.from(JSON.stringify({ uid: userRecord.uid, name })).toString('base64'),
        headers: { 'Content-Type': 'application/json' },
      },
    };

    await tasksClient.createTask({ parent: queuePath, task });

    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    console.error('Error during signup:', error);
    throw new HttpsError('internal', 'An unexpected error occurred during signup.');
  }
});

// 2. The function that PROCESSES the task
export const processSignup = async (req: any, res: any) => {
  const { uid, name } = req.body;

  try {
    const userProfile: UserProfileSchema = { name };
    await db.collection('users').doc(uid).set(userProfile);
    res.status(200).send('Successfully processed user signup.');
  } catch (error) {
    console.error('Error processing signup task:', error);
    res.status(500).send('An error occurred while processing the signup.');
  }
};

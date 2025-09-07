import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Ensure Firebase is initialized (idempotent)
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

export const onMessageCreate = functions.firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const { chatId } = context.params;
    const message = snapshot.data();

    // Only respond to user messages
    if (message.role !== 'user') {
      return;
    }

    const assistantRef = db.collection('chats').doc(chatId).collection('messages').doc();
    const mockResponse = "The journey ahead is one of self-discovery. Embrace the unknown, for it is where you will find your greatest strengths. Trust in your intuition; it is your most reliable guide.".split(' ');

    let currentContent = '';
    for (let i = 0; i < mockResponse.length; i++) {
      currentContent += `${mockResponse[i]} `;
      await new Promise(resolve => setTimeout(resolve, 150)); // Simulate streaming delay
      await assistantRef.set({
        role: 'assistant',
        content: currentContent.trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

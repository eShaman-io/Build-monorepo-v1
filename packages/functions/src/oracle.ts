import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { OpenAI } from "openai";

// Ensure Firebase is initialized (idempotent)
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const onMessageCreate = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const { chatId } = context.params;
    const message = snapshot.data();

    if (message.role !== "user") {
      return;
    }

    const assistantRef = db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .doc();

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4", // Or your desired model
        messages: [{ role: "user", content: message.content }],
        stream: true,
      });

      let fullResponse = "";
      for await (const chunk of stream) {
        fullResponse += chunk.choices[0]?.delta?.content || "";
        // Update the Firestore document with the streaming content
        await assistantRef.set({
          role: "assistant",
          content: fullResponse,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      await assistantRef.set({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

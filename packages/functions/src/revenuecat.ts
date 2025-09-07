import { onRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { RevenueCat } from 'revenuecat';

// NOTE: In a real app, use Firebase secrets for these keys
const revenueCat = new RevenueCat(process.env.REVENUECAT_API_KEY!);

export const revenueCatWebhook = onRequest(async (req, res) => {
  try {
    const event = revenueCat.webhooks.constructEvent(
      req.rawBody,
      req.headers['revenuecat-signature'] as string,
      process.env.REVENUECAT_WEBHOOK_SECRET!
    );

    const { app_user_id, entitlements } = event.event;
    
    // Assuming you have an "premium" entitlement in RevenueCat
    const hasPremium = entitlements.premium?.expires_date === null || new Date(entitlements.premium.expires_date) > new Date();
    const newStatus = hasPremium ? 'active' : 'inactive';

    const userDocRef = admin.firestore().collection('users').doc(app_user_id);
    await userDocRef.update({ subscriptionStatus: newStatus });

    res.status(200).send('Webhook processed successfully.');
  } catch (error: any) {
    if (error instanceof HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
});

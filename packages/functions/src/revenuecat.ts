import { onRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

// Manual webhook signature validation for RevenueCat
function validateWebhookSignature(
  rawBody: Buffer,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  
  // RevenueCat signatures are in format "sha256=<hash>"
  const receivedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  );
}

export const revenueCatWebhook = onRequest(async (req, res) => {
  try {
    // Validate webhook signature manually (since revenuecat v1.0.0 doesn't support webhook validation)
    const signature = req.headers['revenuecat-signature'] as string;
    const secret = process.env.REVENUECAT_WEBHOOK_SECRET!;
    
    if (!signature || !secret) {
      throw new HttpsError('unauthenticated', 'Missing signature or secret');
    }
    
    const isValid = validateWebhookSignature(req.rawBody, signature, secret);
    if (!isValid) {
      throw new HttpsError('unauthenticated', 'Invalid webhook signature');
    }

    // Parse the webhook payload
    const event = JSON.parse(req.rawBody.toString());
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

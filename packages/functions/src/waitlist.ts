import type { Request, Response } from "express"
import cors from "cors"
import * as admin from "firebase-admin"
import crypto from "crypto"
import { WaitlistPayload } from "@esh/schemas/src"

admin.apps.length === 0 && admin.initializeApp()

export const waitlistAdd = async (req: Request, res: Response) => {
  cors({ origin: true })(req, res, async () => {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })
    try {
      const body = (req as any).body ?? {}
      const data = WaitlistPayload.parse(body)
      const emailHash = crypto.createHash("sha256").update(data.email.toLowerCase()).digest("hex")
      await admin.firestore().collection("waitlist").doc(emailHash).set({
        email: data.email, source: data.source, createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true })
      return res.status(200).json({ ok: true })
    } catch (e: any) {
      return res.status(400).json({ ok: false, error: e?.message || "Invalid payload" })
    }
  })
}

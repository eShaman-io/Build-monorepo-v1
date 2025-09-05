import * as functions from "firebase-functions"
import { waitlistAdd } from "./waitlist"
export const waitlist_add = functions.https.onRequest(waitlistAdd)

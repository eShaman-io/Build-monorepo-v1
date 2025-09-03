import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

export type FirebaseClientConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
}

export function initFirebase(cfg: FirebaseClientConfig) {
  if (!getApps().length) initializeApp(cfg as any)
  const auth = getAuth()
  const db = getFirestore()
  return { auth, db }
}

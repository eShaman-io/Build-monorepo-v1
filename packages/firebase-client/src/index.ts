import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth } from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"
import { getFunctions, Functions } from "firebase/functions"
import { getStorage, FirebaseStorage } from "firebase/storage"

export type FirebaseClientConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}

export interface FirebaseServices {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  functions: Functions
  storage: FirebaseStorage
}

let firebaseServices: FirebaseServices | null = null

export function initFirebase(config: FirebaseClientConfig): FirebaseServices {
  if (firebaseServices) {
    return firebaseServices
  }

  let app: FirebaseApp
  
  if (getApps().length === 0) {
    app = initializeApp(config)
  } else {
    app = getApps()[0]
  }

  firebaseServices = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    functions: getFunctions(app),
    storage: getStorage(app)
  }

  return firebaseServices
}

export function getFirebaseServices(): FirebaseServices {
  if (!firebaseServices) {
    throw new Error('Firebase not initialized. Call initFirebase() first.')
  }
  return firebaseServices
}

// Individual service getters for convenience
export function getFirebaseAuth(): Auth {
  return getFirebaseServices().auth
}

export function getFirebaseDb(): Firestore {
  return getFirebaseServices().db
}

export function getFirebaseFunctions(): Functions {
  return getFirebaseServices().functions
}

export function getFirebaseStorage(): FirebaseStorage {
  return getFirebaseServices().storage
}

// Legacy export for backward compatibility
export { getAuth, getFirestore }

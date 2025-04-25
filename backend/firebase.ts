import { initializeApp as fbInitializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth"; // Corrected import
import { getFirestore } from "@react-native-firebase/firestore"; // Corrected Firestore import
import { getStorage } from "@react-native-firebase/storage";

//* Env's
import {
  API_KEY,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  DATABASE_URL, // Uncomment if you need to use the database URL
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
  databaseURL: DATABASE_URL, // Uncomment if you need to use the database URL
};
console.log("Firebase Config:"); // Log the Firebase config for debugging
console.table(firebaseConfig); // Log the Firebase config for debugging

let firebaseApp!: Awaited<ReturnType<typeof fbInitializeApp>>;
let authInstance: ReturnType<typeof getAuth>;
let firestoreInstance: ReturnType<typeof getFirestore>;
let storageInstance: ReturnType<typeof getStorage>;

async function initializeFirebase() {
  try {
    if (!firebaseApp) {
      firebaseApp = await fbInitializeApp(firebaseConfig);
    }
    return firebaseApp;
  } catch (error: any) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
}

const getFirebaseApp = async () => {
  try {
    if (!firebaseApp) {
      await initializeFirebase();
    }
    return firebaseApp;
  } catch (error: any) {
    console.error("Error getting Firebase app:", error);
    throw error;
  }
};

const getFirebaseAuth = async () => {
  try {
    if (!authInstance) {
      const app = await getFirebaseApp();
      authInstance = getAuth(app);
    }
    return authInstance;
  } catch (error: any) {
    console.error("Error getting Firebase Auth:", error);
    throw error;
  }
};

const getFirebaseFirestore = async () => {
  try {
    if (!firestoreInstance) {
      const app = await getFirebaseApp();
      firestoreInstance = getFirestore(app);
    }
    return firestoreInstance;
  } catch (error: any) {
    console.error("Error getting Firebase Firestore:", error);
    throw error;
  }
};

const getFirebaseStorage = async () => {
  try {
    if (!storageInstance) {
      const app = await getFirebaseApp();
      storageInstance = getStorage(app);
    }
    return storageInstance;
  } catch (error: any) {
    console.error("Error getting Firebase Storage:", error);
    throw error;
  }
};

const initializationPromise = initializeFirebase();

export {
  getFirebaseAuth as auth,
  getFirebaseFirestore as firestore,
  getFirebaseStorage as storage,
  getFirebaseApp,
  initializationPromise,
};

export default firebaseApp;

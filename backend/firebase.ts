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

let firebaseApp!: Awaited<ReturnType<typeof fbInitializeApp>>;
let authInstance: ReturnType<typeof getAuth>;
let firestoreInstance: ReturnType<typeof getFirestore>;
let storageInstance: ReturnType<typeof getStorage>;

async function initializeFirebase() {
  if (!firebaseApp) {
    firebaseApp = await fbInitializeApp(firebaseConfig);
  }
  return firebaseApp;
}

const getFirebaseApp = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return firebaseApp;
};

const getFirebaseAuth = () => {
  if (!authInstance) {
    const app = getFirebaseApp();
    authInstance = getAuth(app);
  }
  return authInstance;
};

const getFirebaseFirestore = () => {
  if (!firestoreInstance) {
    const app = getFirebaseApp();
    firestoreInstance = getFirestore(app);
  }
  return firestoreInstance;
};

const getFirebaseStorage = () => {
  if (!storageInstance) {
    const app = getFirebaseApp();
    storageInstance = getStorage(app);
  }
  return storageInstance;
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

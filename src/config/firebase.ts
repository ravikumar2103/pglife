import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuDhpNhvnjnfnuPTbdn1ckQE_SIRoyyJE",
  authDomain: "pg-life-fa29b.firebaseapp.com",
  projectId: "pg-life-fa29b",
  storageBucket: "pg-life-fa29b.firebasestorage.app",
  messagingSenderId: "628518008761",
  appId: "1:628518008761:web:ede03afa6f195913796868",
  measurementId: "G-70ZXF9P0BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
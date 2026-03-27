import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqP4MSi2njWn3TLndEvCkHG_ge_1jMrSM",
  authDomain: "troomie-2026.firebaseapp.com",
  projectId: "troomie-2026",
  storageBucket: "troomie-2026.firebasestorage.app",
  messagingSenderId: "427383188235",
  appId: "1:427383188235:web:a4fc3623510098c38b500e",
  measurementId: "G-4Q8TGMY5ZN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Storage disabled intentionally

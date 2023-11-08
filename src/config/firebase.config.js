// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz00E2lvjvskXUEwN76QfJg4x1sd2BK64",
  authDomain: "esignature-5990f.firebaseapp.com",
  projectId: "esignature-5990f",
  storageBucket: "esignature-5990f.appspot.com",
  messagingSenderId: "851891428119",
  appId: "1:851891428119:web:f03ec385cb58cb1418b552",
  measurementId: "G-E40RGNP8F5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

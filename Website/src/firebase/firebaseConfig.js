// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCB3g9TgzJpNJiyKaZhqgz5U8a9-hC46Gk",
  authDomain: "prjdeepak-52038.firebaseapp.com",
  projectId: "prjdeepak-52038",
  storageBucket: "prjdeepak-52038.firebasestorage.app",
  messagingSenderId: "1008950751588",
  appId: "1:1008950751588:web:a6764d0da4a132c9604a71",
  measurementId: "G-7P1L3M8554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
export const storage = getStorage(app)
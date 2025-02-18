// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBfIaYOe__iCjMR2QlpMY4QSzDUnGlOiI",
  authDomain: "taskmanger-5b70e.firebaseapp.com",
  projectId: "taskmanger-5b70e",
  storageBucket: "taskmanger-5b70e.firebasestorage.app",
  messagingSenderId: "1002750258516",
  appId: "1:1002750258516:web:a094400e862f5df1dd6cc1",
  measurementId: "G-4WVS6WQNES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };

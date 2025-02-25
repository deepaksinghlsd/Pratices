import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCB3g9TgzJpNJiyKaZhqgz5U8a9-hC46Gk",
  authDomain: "prjdeepak-52038.firebaseapp.com",
  projectId: "prjdeepak-52038",
  storageBucket: "prjdeepak-52038.firebasestorage.app",
  messagingSenderId: "1008950751588",
  appId: "1:1008950751588:web:a6764d0da4a132c9604a71",
  measurementId: "G-7P1L3M8554"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const registerWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BEqmplDfE8FjZYsUO7dn08lhrcSWE9vADfR8rXyQApgKITfUS2wKi741QOZfpaPiOAuwqsJWAuCTviNsME_8Z9s" });
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});
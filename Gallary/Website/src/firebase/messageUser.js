// firebase/messageUser.js
import { getToken } from "firebase/messaging";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { messaging } from "./firebaseConfig";

export const requestForToken = async (userId) => {
  try {
    if (!messaging) {
      console.error("Messaging is not initialized");
      return null;
    }
    
    // Get token
    const currentToken = await getToken(messaging, {
      vapidKey: "BEqmplDfE8FjZYsUO7dn08lhrcSWE9vADfR8rXyQApgKITfUS2wKi741QOZfpaPiOAuwqsJWAuCTviNsME_8Z9s" // Replace with your actual key
    });
    
    if (currentToken) {
      console.log("Current token:", currentToken);
      
      // Save the token to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", userId), {
        fcmToken: currentToken,
        tokenLastUpdated: new Date().toISOString()
      }, { merge: true });
      
      return currentToken;
    } else {
      console.warn("No registration token available");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};
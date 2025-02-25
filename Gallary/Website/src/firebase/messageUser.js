// src/firebase/messaging.js
import { messaging, getToken } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


// export const requestpermission = async() =>{
//   const permission = await Notification.requestPermission()
//   if(permission === 'granted'){

//   }
// }
export const requestForToken = async (userId) => {
  try {
    const token = await getToken(messaging, { vapidKey: "BEqmplDfE8FjZYsUO7dn08lhrcSWE9vADfR8rXyQApgKITfUS2wKi741QOZfpaPiOAuwqsJWAuCTviNsME_8Z9s" });

    if (token) {
      await setDoc(doc(db, "users", userId), { fcmToken: token }, { merge: true });
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

import { auth ,db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
export const signUp = async (email, password) => {
  
  try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     const userDoc = doc(db , "Authuser",  userCredential.user.uid);
     await setDoc(userDoc , {
      email: userCredential.user.email ,
    })
      console.log("data written succesfully");
      return userCredential
      
  } catch (error) {
    console.error("Error:", error.message)
  }
};

export const login = async (email, password) => {
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = doc(db , "Authuser", userCredential.user.uid);
    await setDoc(userDoc , {
     email: userCredential.user.email ,
    })
     console.log("data written succesfully");
     return userCredential
     
 } catch (error) {
   console.error("Error:", error.message)
 }
};

export const logout = async () => {
  return await signOut(auth)
};

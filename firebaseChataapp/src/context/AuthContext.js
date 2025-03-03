// import { Children, createContext, useEffect, useState } from "react";
// import {auth} from "../firebase/firebaseconfig"
// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// export const AuthContext = createContext();
// export const AuthProvider = ({Children}) => {
//     const [user , setUser] =useState(null);
//     useEffect (()=>{
//         const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
//             setUser(currentUser);
//         });
//         return () => unsubscribe();
//     },[]);
//     const login = (email , password) => signInWithEmailAndPassword(auth,email,password);
//     const register = (email , password) => createUserWithEmailAndPassword(auth,email,password);
//     const logout = () => signOut(auth);
//     return (
//         AuthContext
//     )
// }

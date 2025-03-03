import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCB3g9TgzJpNJiyKaZhqgz5U8a9-hC46Gk",
    authDomain: "prjdeepak-52038.firebaseapp.com",
    databaseURL: "https://prjdeepak-52038-default-rtdb.firebaseio.com",
    projectId: "prjdeepak-52038",
    storageBucket: "prjdeepak-52038.firebasestorage.app",
    messagingSenderId: "1008950751588",
    appId: "1:1008950751588:web:a6764d0da4a132c9604a71",
    measurementId: "G-7P1L3M8554"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const database = getDatabase(app);

  export {auth, database, ref, set, push,onValue};

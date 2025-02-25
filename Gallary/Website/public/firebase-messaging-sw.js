// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCB3g9TgzJpNJiyKaZhqgz5U8a9-hC46Gk",
  authDomain: "prjdeepak-52038.firebaseapp.com",
  projectId: "prjdeepak-52038",
  storageBucket: "prjdeepak-52038.appspot.com", // Corrected storageBucket
  messagingSenderId: "1008950751588",
  appId: "1:1008950751588:web:a6764d0da4a132c9604a71",
};

// Initialize Firebase inside the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const { title, body, icon } = payload.notification;
  
  self.registration.showNotification(title, {
    body,
    icon,
  });
});

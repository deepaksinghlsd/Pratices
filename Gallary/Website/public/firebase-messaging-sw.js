// Import Firebase scripts for service worker
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCB3g9TgzJpNJiyKaZhqgz5U8a9-hC46Gk",
    authDomain: "prjdeepak-52038.firebaseapp.com",
    databaseURL: "https://prjdeepak-52038-default-rtdb.firebaseio.com",
    projectId: "prjdeepak-52038",
    storageBucket: "prjdeepak-52038.appspot.com", // FIXED: Incorrect storage URL
    messagingSenderId: "1008950751588",
    appId: "1:1008950751588:web:a6764d0da4a132c9604a71",
    measurementId: "G-7P1L3M8554"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);

    if (payload && payload.notification) {
        const { title, body, icon } = payload.notification;
        
        self.registration.showNotification(title, {
            body,
            icon: icon || "/default-icon.png", // Fallback icon if not provided
            vibrate: [200, 100, 200], // Vibration pattern for better UX
            data: payload.data || {}, // Store additional data for interaction
        });
    }
});

// Handle notification click action (optional)
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    // Open a specific page when the notification is clicked
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow("/"); // Change URL if needed
        })
    );
});

/* eslint-disable no-undef */
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

// Initialize Firebase Admin
initializeApp();

const db = getFirestore();
const fcm = getMessaging();

// Firestore trigger for create/update/delete
exports.notifyOnUploadChange = onDocumentWritten("uploads/{userId}/{fileId}", async (event) => {
    // eslint-disable-next-line no-unused-vars
    const { userId, fileId } = event.params;

    let action;
    if (!event.data?.before.exists) {
        action = "created";
    } else if (!event.data?.after.exists) {
        action = "deleted";
    } else {
        action = "updated";
    }

    const fileData = event.data?.after.exists ? event.data.after.data() : event.data.before.data();

    // Get user's FCM token from Firestore
    const userDoc = await db.collection("users").doc(userId).get();
    const userToken = userDoc.exists ? userDoc.data().fcmToken : null;
    if (!userToken) {
        console.log("No token found for user");
        return null;
    }

    // Construct notification payload
    const payload = {
        notification: {
            title: `File ${action}`,
            body: `Your file "${fileData.title}" was ${action}`,
        },
        token: userToken,
    };

    // Send push notifications
    try {
        await fcm.send(payload);
    } catch (error) {
        console.error("Error sending notification:", error);
    }

    return null;
});

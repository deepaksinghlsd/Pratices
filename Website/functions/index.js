const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({origin: true}); // Allow all origins

exports.sendMessage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {senderId, recipientId, message} = req.body;

    try {
      console.log(`Sender: ${senderId}, Recipient: ${recipientId}`);

      const recipientDoc = await db.collection("users").doc(recipientId).get();
      if (!recipientDoc.exists) {
        return res.status(404).send("Recipient not found.");
      }

      const recipientToken = recipientDoc.data().fcmToken;

      const messageRef = await db.collection("messages").add({
        senderId,
        recipientId,
        recipientToken,
        message,
        status: "sent",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      const notification = {
        notification: {
          title: "New Message",
          body: message,
        },
        token: recipientToken,
      };

      await admin.messaging().send(notification);
      await messageRef.update({status: "delivered"});

      res.status(200).send("Message sent and delivered.");
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).send(error);
    }
  });
});

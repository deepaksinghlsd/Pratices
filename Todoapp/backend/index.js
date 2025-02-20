import admin from "firebase-admin"; // Ensure you installed firebase-admin
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("./firebase/serviceAccountkey.json"), // Replace with your service account key
});


// API to Disable User in Firebase Auth
app.post("/disable-user", async (req, res) => {
  try {
    console.log(req.body);
    
    const { uid, disable } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User UID is required" });
    }

    await admin.auth().updateUser(uid, { disabled: disable });

    res.status(200).json({
      success: true,
      message: `User ${disable ? "disabled" : "enabled"} successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start Server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

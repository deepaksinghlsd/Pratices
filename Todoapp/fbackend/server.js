const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const syncRoutes = require("./routers/syncRoutes");

const serviceAccount = require("./firebaseServiceAccount.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", syncRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

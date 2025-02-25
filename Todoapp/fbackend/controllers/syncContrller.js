const admin = require("firebase-admin");
const { insertItems, getAllItems } = require("../models/itemModel");

const db = admin.firestore();

const syncFirestoreToMySQL = async (req, res) => {
  try {
    const snapshot = await db.collection("items").get();
    const data = [];

    snapshot.forEach((doc) => {
      const item = doc.data();
      data.push([doc.id, item.name, item.imageUrl]);
    });

    await insertItems(data);
    res.json({ message: "Data synced successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { syncFirestoreToMySQL, fetchItems };

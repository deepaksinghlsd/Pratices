const db = require("../db");

const insertItems = async (items) => {
  const query = "INSERT INTO items (id, name, image_url) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name), image_url=VALUES(image_url)";
  await db.query(query, [items]);
};

const getAllItems = async () => {
  const [rows] = await db.query("SELECT * FROM items");
  return rows;
};

module.exports = { insertItems, getAllItems };

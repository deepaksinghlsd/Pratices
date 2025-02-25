const express = require("express");
const { syncFirestoreToMySQL, fetchItems } = require("../controllers/syncController");

const router = express.Router();

router.get("/sync", syncFirestoreToMySQL);
router.get("/items", fetchItems);

module.exports = router;

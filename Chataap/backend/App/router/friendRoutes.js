const express = require("express");
const { sendFriendRequest, acceptFriendRequest } = require("../controllers/friendController");

const router = express.Router();

router.post("/send", sendFriendRequest);
router.post("/accept", acceptFriendRequest);

module.exports = router;
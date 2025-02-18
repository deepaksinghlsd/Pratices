const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', authMiddleware, async (req, res) => {
  const { username } = req.query;
  const users = await User.find({ username: new RegExp(username, 'i'), _id: { $ne: req.userId } });
  res.json(users);
});

module.exports = router;

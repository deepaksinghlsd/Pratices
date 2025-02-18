const express = require('express');
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', authMiddleware, async (req, res) => {
  const { userId } = req.body;
  const friendRequest = new FriendRequest({ sender: req.userId, recipient: userId });
  await friendRequest.save();
  res.status(201).json(friendRequest);
});

router.get('/requests', authMiddleware, async (req, res) => {
  const requests = await FriendRequest.find({ recipient: req.userId, status: 'pending' }).populate('sender');
  res.json(requests);
});

router.post('/requests/:id/accept', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const friendRequest = await FriendRequest.findById(id);
  friendRequest.status = 'accepted';
  await friendRequest.save();
  const sender = await User.findById(friendRequest.sender);
  const recipient = await User.findById(friendRequest.recipient);
  sender.friends.push(recipient._id);
  recipient.friends.push(sender._id);
  await sender.save();
  await recipient.save();
  res.json(friendRequest);
});

module.exports = router;

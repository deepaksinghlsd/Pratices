const express = require('express');
const router = express.Router();
const userController = require('../Controler/UserControler');
const authMiddleware = require('../Middleware/Authmiddlerware');

router.post('/send-friend-request', authMiddleware, userController.sendFriendRequest);
router.post('/accept-friend-request', authMiddleware, userController.acceptFriendRequest);
router.post('/reject-friend-request', authMiddleware, userController.rejectFriendRequest);
router.get('/friend-requests', authMiddleware, userController.getFriendRequests);
router.get('/friends', authMiddleware, userController.getFriends);

module.exports = router;
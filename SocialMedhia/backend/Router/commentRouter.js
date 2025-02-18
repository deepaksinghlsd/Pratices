const express = require('express');
const router = express.Router();
const commentController = require('../Controler/CommentController');
const authMiddleware = require('../Middleware/Authmiddlerware');

router.post('/', authMiddleware, commentController.addComment);

module.exports = router;
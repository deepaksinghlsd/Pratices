const express = require('express');
const router = express.Router();
const postController = require('../Controler/PosrControlwe');
const authMiddleware = require('../Middleware/Authmiddlerware');

router.post('/', authMiddleware, postController.createPost);
router.get('/feed', authMiddleware, postController.getFeed);

module.exports = router;
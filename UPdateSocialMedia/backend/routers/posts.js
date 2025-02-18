const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware , async (req, res) => {
  const { text } = req.body;
  const post = new Post({ text, author: req.userId });
  await post.save();
  res.status(201).json(post);
});

router.get('/feed', authMiddleware ,  async (req, res) => {
  const posts = await Post.find({}).populate('author');
  res.json(posts);
});

module.exports = router;

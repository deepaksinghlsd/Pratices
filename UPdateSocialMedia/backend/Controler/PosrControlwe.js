const Post = require('../Model/PostSchema');
const User = require('../Model/UserSchema');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({
      user: req.user._id,
      content
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      $or: [
        { user: { $in: [...user.friends, req.user._id] } },
        { 'comments.user': { $in: [...user.friends, req.user._id] } }
      ]
    }).sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate('comments.user', 'username')
      .populate('likes', 'username');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    post.comments.push({
      user: req.user._id,
      content
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
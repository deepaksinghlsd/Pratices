const User = require('../Model/UserSchema');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Already friends' });
    }

    if (friend.friendRequests.includes(user._id)) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    friend.friendRequests.push(user._id);
    user.sentFriendRequests.push(friendId);
    await friend.save();
    await user.save();

    res.json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ error: 'No friend request from this user' });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    friend.sentFriendRequests = friend.sentFriendRequests.filter(id => id.toString() !== user._id.toString());
    user.friends.push(friendId);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    friend.sentFriendRequests = friend.sentFriendRequests.filter(id => id.toString() !== user._id.toString());

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friendRequests', 'username email');
    res.json(user.friendRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'username email');
    res.json(user.friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
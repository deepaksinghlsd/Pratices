const FriendRequest = require("../models/Friendrequest");

exports.sendFriendRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const from = req.user.id;

    const newRequest = new FriendRequest({ from, to });
    await newRequest.save();

    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "accepted";
    await request.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

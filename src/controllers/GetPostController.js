const Post = require("../models/Post");

const GetPostController = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .populate("_id")
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { GetPostController };

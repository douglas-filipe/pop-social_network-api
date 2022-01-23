const {
  CreatePostService,
  GetPostService,
  DeletePostService,
  LikePostService,
} = require("../services/post.services");

const CreatePostController = async (req, res) => {
  try {
    const { description } = req.body;
    const img = req.file;
    const post = await CreatePostService(description, img, req.id);
    res.status(201).json({ post });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const DeletePostController = async (req, res) => {
  try {
    await DeletePostService(req.params.id);
    res.status(204).json({ message: "Deleted" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

const GetPostController = async (req, res) => {
  try {
    const posts = await GetPostService();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const LikePostController = async (req, res) => {
  try {
    const likes = await LikePostService(req.params.id, req.id);
    res.json({ message: likes });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports = {
  CreatePostController,
  DeletePostController,
  GetPostController,
  LikePostController,
};

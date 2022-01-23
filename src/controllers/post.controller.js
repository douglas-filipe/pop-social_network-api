const Post = require("../models/Post");
const uploadPhotoPost = require("../utils/photoS3");

const CreatePostController = async (req, res) => {
  try {
    const { description } = req.body;
    const img = req.file;

    if (!img) {
      const post = new Post({
        description,
        author: req.id,
      });
      await post.save();
      return res.status(201).json({ post });
    }

    const { buffer } = img;
    const file = await uploadPhotoPost(buffer, img);
    const post = new Post({
      description,
      imgUrl: file.Location,
      author: req.id,
      key: file.Key,
    });
    await post.save();
    return res.status(201).json({ post });
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
};

const DeletePostController = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) return res.status(404).json({ message: "Não encontrado" });
    await Post.findByIdAndDelete(req.params.id);
    res.status(203).json({ message: "Deletado" });
  } catch {
    res.status(400).json({ message: "Erro ao deletar" });
  }
};

const GetPostController = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .populate("_id");
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const LikePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.id)) {
      await post.updateOne({ $push: { likes: req.id } });
      res.status(200).json({ message: "Adicionado aos favoritos" });
    } else {
      await post.updateOne({ $pull: { likes: req.id } });
      res.status(200).json({ message: "Removido dos favoritos" });
    }
  } catch {
    res.status(400).json({ message: "Erro ao adicionar aos favoritos" });
  }
};

module.exports = {
  CreatePostController,
  DeletePostController,
  GetPostController,
  LikePostController,
};

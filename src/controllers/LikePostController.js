const Post = require("../models/Post");

const LikePostController = async(req, res) => {
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

module.exports = { LikePostController };

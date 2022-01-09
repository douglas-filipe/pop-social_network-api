const Post = require("../models/Post");

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

module.exports = { DeletePostController };

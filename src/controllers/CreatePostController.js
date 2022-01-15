const Post = require("../models/Post");
const uploadPhotoPost = require("../utils/photoS3");

const CreatePostController = async (req, res) => {
  const img = req.file;

  if (!img) {
    return res.status(400).json({ message: "Insira uma imagem" });
  }

  const { buffer } = img;
  const file = await uploadPhotoPost(buffer, img);

  const { description } = req.body;
  try {
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

module.exports = { CreatePostController };

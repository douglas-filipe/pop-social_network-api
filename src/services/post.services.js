const Post = require("../models/Post");
const { uploadPhotoPost, deletePhoto } = require("../utils/photoS3");
const CreatePostService = async (description, img, author) => {
  try {
    if (!img) {
      const post = new Post({
        description,
        author,
      });
      await post.save();
      return post;
    }

    const { buffer } = img;
    const file = await uploadPhotoPost(buffer, img);
    const post = new Post({
      description,
      imgUrl: file.Location,
      author,
      key: file.Key,
    });
    await post.save();
    return post;
  } catch (e) {
    throw new Error(e.message);
  }
};

const DeletePostService = async (id) => {
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new Error("Not found");
    }
    await deletePhoto(post.key);
    await Post.findByIdAndDelete(id);
    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const GetPostService = async () => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "name");
  return posts;
};

const LikePostService = async (id, userId) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Not found");
    }
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return "Adding likes";
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      return "Removing likes";
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const UpdatePostService = async (description, id, img) => {
  try {
    const file = img ? await uploadPhotoPost(img.buffer, img) : undefined;
    const post = await Post.findById(id);
    const postUpdate = await Post.findByIdAndUpdate(
      id,
      {
        description,
        imgUrl: file ? file.Location : post.imgUrl,
        key: file ? file.Key : post.key,
      },
      { new: true }
    );
    if (!post) {
      throw new Error("Not Found");
    }
    if (img) {
      await deletePhoto(post.key);
    }
    await postUpdate.save();
    return postUpdate;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

module.exports = {
  CreatePostService,
  GetPostService,
  DeletePostService,
  LikePostService,
  UpdatePostService,
};

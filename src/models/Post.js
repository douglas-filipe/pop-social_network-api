const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    imgUrl: { type: String, required: false },
    key: { type: String, required: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Post", postSchema);

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const multerConfig = require("../config/uploadPhoto");
const {
  CreatePostController,
  GetPostController,
  DeletePostController,
  LikePostController,
  UpdatePostController,
} = require("../controllers/post.controller");

router.post(
  "/",
  verifyToken,
  multer(multerConfig).single("img"),
  CreatePostController
);

router.get("/", GetPostController);

router.put("/like/:id", verifyToken, LikePostController);

router.delete("/:id", verifyToken, DeletePostController);
router.put(
  "/:id",
  verifyToken,
  multer(multerConfig).single("img"),
  UpdatePostController
);

module.exports = router;

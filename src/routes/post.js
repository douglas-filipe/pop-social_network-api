const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const multerConfig = require("../config/uploadPhoto");
const { CreatePostController } = require("../controllers/CreatePostController");
const { GetPostController } = require("../controllers/GetPostController");
const { LikePostController } = require("../controllers/LikePostController");

router.post(
  "/",
  verifyToken,
  multer(multerConfig).single("img"),
  CreatePostController
);

router.get("/", verifyToken, GetPostController);

router.put("/:id/like", verifyToken, LikePostController);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const multerConfig = require("../config/uploadPhoto");
const { CreatePostController } = require("../controllers/CreatePostController");
const { GetPostController } = require("../controllers/GetPostController");
const { LikePostController } = require("../controllers/LikePostController");
const { DeletePostController } = require("../controllers/DeletePostController");

router.post(
  "/",
  verifyToken,
  multer(multerConfig).single("img"),
  CreatePostController
);

router.get("/", GetPostController);

router.put("/:id/like", verifyToken, LikePostController);

router.delete("/:id", verifyToken, DeletePostController);

module.exports = router;

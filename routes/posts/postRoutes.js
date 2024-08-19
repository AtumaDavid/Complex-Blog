const express = require("express");
const {
  createPostController,
  getAllPostsController,
  getPostController,
  updatePostController,
  deletePostController,
  toggleLikesController,
  toggleDislikeController,
} = require("../../controllers/posts/postController");
const isLoginMiddleware = require("../../middleware/isLogin");
const multer = require("multer");
const storage = require("../../config/cloudinary");

const postRouter = express.Router();

// multer config. file upload muddleware
const upload = multer({ storage });

// create post
postRouter.post(
  "/",
  isLoginMiddleware,
  upload.single("image"),
  createPostController
);

// get all posts
postRouter.get("/", isLoginMiddleware, getAllPostsController); //id of post

// toggle likes
postRouter.get("/likes/:id", isLoginMiddleware, toggleLikesController); //id of post

// toggle dislikes
postRouter.get("/dislikes/:id", isLoginMiddleware, toggleDislikeController); //id of post

// get a post
postRouter.get("/:id", isLoginMiddleware, getPostController);

// update post
postRouter.put(
  "/:id",
  isLoginMiddleware,
  upload.single("image"),
  updatePostController
);

// delete post
postRouter.delete("/:id", isLoginMiddleware, deletePostController);

module.exports = postRouter;

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

const postRouter = express.Router();

// create post
postRouter.post("/", isLoginMiddleware, createPostController);

// get all posts
postRouter.get("/", isLoginMiddleware, getAllPostsController); //id of post

// toggle likes
postRouter.get("/likes/:id", isLoginMiddleware, toggleLikesController); //id of post

// toggle dislikes
postRouter.get("/dislikes/:id", isLoginMiddleware, toggleDislikeController); //id of post

// get a post
postRouter.get("/:id", isLoginMiddleware, getPostController);

// update post
postRouter.put("/:id", updatePostController);

// delete post
postRouter.delete("/:id", deletePostController);

module.exports = postRouter;

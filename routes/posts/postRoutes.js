const express = require("express");
const {
  createPostController,
  getAllPostsController,
  getPostController,
  updatePostController,
  deletePostController,
} = require("../../controllers/posts/postController");

const postRouter = express.Router();

// create post
postRouter.post("/", createPostController);

// get all posts
postRouter.get("/", getAllPostsController);

// get a post
postRouter.get("/:id", getPostController);

// update post
postRouter.put("/:id", updatePostController);

// delete post
postRouter.delete("/:id", deletePostController);

module.exports = postRouter;

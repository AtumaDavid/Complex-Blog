const express = require("express");
const {
  createCommentController,
  getCommentController,
  updateCommentController,
  deleteCommentController,
} = require("../../controllers/comments/commentsController");
const isLoginMiddleware = require("../../middleware/isLogin");

const commentsRouter = express.Router();

// create comments
commentsRouter.post("/:id", isLoginMiddleware, createCommentController);

// get a comment
commentsRouter.get("/:id", isLoginMiddleware, getCommentController);

// update post
commentsRouter.put("/:id", isLoginMiddleware, updateCommentController);

// delete comment
commentsRouter.delete("/:id", isLoginMiddleware, deleteCommentController);

module.exports = commentsRouter;

// // get all posts
// postRouter.get("/", async (req, res) => {
//   try {
//     res.json({
//       status: "Success",
//       data: "gt all posts",
//     });
//   } catch (error) {
//     res.json(error.message);
//   }
// });

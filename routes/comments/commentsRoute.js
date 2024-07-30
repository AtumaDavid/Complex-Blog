const express = require("express");
const {
  createCommentController,
  getCommentController,
  updateCommentController,
  deleteCommmentConntroller,
} = require("../../controllers/comments/commentsController");

const commentsRouter = express.Router();

// create comments
commentsRouter.post("/", createCommentController);

// get a comment
commentsRouter.get("/:id", getCommentController);

// update post
commentsRouter.put("/:id", updateCommentController);

// delete comment
commentsRouter.delete("/:id", deleteCommmentConntroller);

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

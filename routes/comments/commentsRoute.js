const express = require("express");

const commentsRouter = express.Router();

// create comments
commentsRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "comments created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

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

// get a comment
commentsRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "get a comment",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// update post
commentsRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update comment",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// delete comment
commentsRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "delet comment",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = commentsRouter;

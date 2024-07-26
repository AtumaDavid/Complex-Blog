const express = require("express");

const postRouter = express.Router();

// create post
postRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "post created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// get all posts
postRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "gt all posts",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// get a post
postRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "get a post",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// update post
postRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update post",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// delete post
postRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "delet route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = postRouter;

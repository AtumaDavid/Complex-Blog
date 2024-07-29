const express = require("express");

const categoryRouter = express.Router();

// create category
categoryRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// get all posts
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

// get a category
categoryRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "got a category",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// update cayegory
categoryRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update category",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// delete post
categoryRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "deleted category",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = categoryRouter;

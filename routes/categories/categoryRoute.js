const express = require("express");
const {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controllers/categories/categoryController");

const categoryRouter = express.Router();

// create category
categoryRouter.post("/", createCategoryController);

// get a category
categoryRouter.get("/:id", getCategoryController);

// update category
categoryRouter.put("/:id", updateCategoryController);

// delete post
categoryRouter.delete("/:id", deleteCategoryController);

module.exports = categoryRouter;

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

const express = require("express");
const {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
} = require("../../controllers/categories/categoryController");
const isLoginMiddleware = require("../../middleware/isLogin");

const categoryRouter = express.Router();

// create category
categoryRouter.post("/", isLoginMiddleware, createCategoryController);

// get all categories
categoryRouter.get("/", isLoginMiddleware, getAllCategoriesController);

// get a category
categoryRouter.get("/:id", isLoginMiddleware, getCategoryController);

// update category
categoryRouter.put("/:id", isLoginMiddleware, updateCategoryController);

// delete post
categoryRouter.delete("/:id", isLoginMiddleware, deleteCategoryController);

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

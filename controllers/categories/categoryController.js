const Category = require("../../model/Category/Category");

// create category
module.exports.createCategoryController = async (req, res) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.user });
    res.json({
      status: "Success",
      data: category,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get all categories
module.exports.getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "Success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get category
module.exports.getCategoryController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "Success",
      data: category,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update category
module.exports.updateCategoryController = async (req, res) => {
  const { title } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    res.json({
      status: "Success",
      data: category,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete category
module.exports.deleteCategoryController = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "Success",
      data: "deleted category",
    });
  } catch (error) {
    res.json(error.message);
  }
};

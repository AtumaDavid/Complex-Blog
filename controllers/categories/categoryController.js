// create category
module.exports.createCategoryController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// get category
module.exports.getCategoryController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "got a category",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update category
module.exports.updateCategoryController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update category",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete category
module.exports.deleteCategoryController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "deleted category",
    });
  } catch (error) {
    res.json(error.message);
  }
};

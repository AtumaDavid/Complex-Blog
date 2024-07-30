// create post
module.exports.createPostController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "post created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// get all post
module.exports.getAllPostsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "gt all posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// get a post
module.exports.getPostController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "get a post",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update post
module.exports.updatePostController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "update post",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete post
module.exports.deletePostController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "delet route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

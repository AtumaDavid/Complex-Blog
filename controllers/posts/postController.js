const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

// create post
module.exports.createPostController = async (req, res) => {
  const { title, description } = req.body;
  try {
    // find the user
    const author = await User.findById(req.user);

    // create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
    });

    // associate user to a post -push the post into the user post field
    author.posts.push(postCreated._id);

    // save
    await author.save();

    res.json({
      status: "Success",
      data: postCreated,
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

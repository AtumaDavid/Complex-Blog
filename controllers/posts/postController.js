const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

// create post
module.exports.createPostController = async (req, res) => {
  const { title, description, category } = req.body;
  // console.log(req.body);
  try {
    // find the user
    const author = await User.findById(req.user);

    // check if user is blocked
    if (author.isBlocked) {
      return res.status(403).json({ message: "You are blocked by Admin" });
    }

    // create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
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
    res.status(500).json(error.message);
  }
};

// get all post
module.exports.getAllPostsController = async (req, res) => {
  try {
    // find all posts

    const posts = await Post.find({})
      // This replaces the user ID with the full user document
      // Allows access to user details (e.g., name, email) directly from the post object
      .populate("user")
      // Populate only the 'title' field of the 'category'
      // This adds the category title to each post without fetching all category details
      .populate("category", "title");

    // check if the user is blocked by the post owner
    const filteredPost = posts.filter((post) => {
      // console.log(post);
      // get all blocked users
      const blockedUsers = post.user.blocked; //scheck for blockedUsers from blocked array
      // console.log(blockedUsers);
      const isBlocked = blockedUsers.includes(req.user);
      // console.log(isBlocked);
      return isBlocked ? null : post;
    });

    res.json({
      status: "Success",
      data: posts,
    });
  } catch (error) {
    res.status(500).json(error.message);
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
    res.status(500).json(error.message);
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
    res.status(500).json(error.message);
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
    res.status(500).json(error.message);
  }
};

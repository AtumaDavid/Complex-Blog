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

// get a post detail
module.exports.getPostController = async (req, res) => {
  try {
    // find the post
    const post = await Post.findById(req.params.id);

    // check if user has viewed the post
    const isViewed = post.numViews.includes(req.user);

    if (isViewed) {
      // User has already viewed the post
      res.json({
        status: "Success",
        data: post,
      });
    } else {
      // User has not viewed the post, so add them to numViews
      post.numViews.push(req.user);
      await post.save();

      res.json({
        status: "Success",
        data: post,
        message: "User view recorded.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
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

// toggle likes
module.exports.toggleLikesController = async (req, res) => {
  try {
    // get the post
    const post = await Post.findById(req.params.id);

    // check if the user has already liked the post
    const hasLiked = post.likes.includes(req.user);

    // togle like on and off
    // if user has already liked the post, unlike the post
    if (hasLiked) {
      post.likes = post.likes.filter((like) => like != req.user);
      await post.save();
    } else {
      // if user has not liked the post, like the post
      post.likes.push(req.user);
      await post.save();
    }

    res.json({
      status: "Success",
      data: post,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// toggle dislike
module.exports.toggleDislikeController = async (req, res) => {
  try {
    // get the post
    const post = await Post.findById(req.params.id);

    // check if the user has already liked the post
    const hasDisLiked = post.disLikes.includes(req.user);

    // toggle like on and off
    // if user has already disliked the post, Like the post
    if (hasDisLiked) {
      post.disLikes = post.disLikes.filter((dislike) => dislike != req.user);
      await post.save();
    } else {
      // if user has not liked the post, like the post
      post.disLikes.push(req.user);
      await post.save();
    }

    res.json({
      status: "Success",
      data: post,
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

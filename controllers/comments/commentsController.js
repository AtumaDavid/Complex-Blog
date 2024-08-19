const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

// create comments
module.exports.createCommentController = async (req, res) => {
  const { description } = req.body;
  try {
    // the the post
    const post = await Post.findById(req.params.id);

    // create comment
    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.user,
    });

    // push the comment to post
    post.comments.push(comment._id);

    // find the user
    const user = await User.findById(req.user);

    // push the comment to user
    user.comments.push(comment._id);

    // save
    // disablle validation
    await post.save({ validateBeforeSave: false });
    await post.save({ validateBeforeSave: false });
    // await post.save();
    // await user.save();

    res.json({
      status: "Success",
      data: comment,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single comment
module.exports.getCommentController = async (req, res) => {
  try {
    // Find the comment by ID
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({
        status: "Error",
        message: "Comment not found",
      });
    }

    // Respond with the found comment
    res.json({
      status: "Success",
      data: comment,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// update comment
module.exports.updateCommentController = async (req, res) => {
  const { description } = req.body;
  try {
    // find the comment
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({
        status: "Error",
        message: "Comment not found",
      });
    }

    // Check if the user is authorized to update the comment
    if (comment.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        status: "Fail",
        message: "You are not authorized to update this comment",
      });
    }

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );

    // Respond with the updated comment
    res.json({
      status: "Success",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// delete comment
module.exports.deleteCommentController = async (req, res) => {
  try {
    // Find the comment
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({
        status: "Error",
        message: "Comment not found",
      });
    }

    // Check if the user is authorized to delete the comment
    if (comment.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        status: "Fail",
        message: "You are not authorized to delete this comment",
      });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(req.params.id);

    // Respond with a success message
    res.json({
      status: "Success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const mongoose = require("mongoose");

// schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title for your post is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post Category is required"],
    },
    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //  user who created the post
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      // required: [true, "Post image is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Hook
postSchema.pre(/^find/, function (next) {
  // add views count as virtual property
  postSchema.virtual("viewsCount").get(function () {
    // const post = this
    return this.numViews.length;
  });

  // add likes  count property
  postSchema.virtual("likesCount").get(function () {
    return this.likes.length;
  });

  // add dislikes  count property
  postSchema.virtual("dislikesCount").get(function () {
    return this.disLikes.length;
  });

  next();
});

// compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

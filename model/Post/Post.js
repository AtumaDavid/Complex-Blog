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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
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
      required: [true, "Post image is required"],
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

  // check most liked post in percentage
  postSchema.virtual("likesPercentage").get(function () {
    const total = this.likes.length + this.disLikes.length;
    const percentage = (this.likes.length / total) * 100;
    return `${percentage} %`;
  });

  // check most disliked post in percentage
  postSchema.virtual("dislikesPercentage").get(function () {
    const total = this.likes.length + this.disLikes.length;
    const percentage = (this.disLikes.length / total) * 100;
    return `${percentage} %`;
  });

  // if days is less than 0, return today, if days is 1, return yesterday, else return days ago
  postSchema.virtual("daysAgo").get(function () {
    const today = new Date();
    const postDate = new Date(this.createdAt);
    const timeDiff = today.getTime() - postDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (daysAgo <= 0) return "Today";
    else if (daysAgo == 1) return "Yesterday";
    else return daysAgo + " days ago";
  });

  next();
});

// compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

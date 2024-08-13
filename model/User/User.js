const mongoose = require("mongoose");
const Post = require("../Post/Post");

// create schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // postCount: {
    //   type: Number,
    //   default: 0,
    // },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "User",
      },
    ],
    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "User",
      },
    ],
    // plan: {
    //   type: String,
    //   enum: ["Free", "Preminum", "Pro"],
    //   default: "Free",
    // },

    userAward: {
      type: String,
      enum: ["Bronze", "Silva", "Gold"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// hooks
// pre- before record is saved
// /^find/--> findOne, find
userSchema.pre(/^find/, async function (next) {
  // get the user id
  // console.log(this);
  const userId = this._conditions._id;

  // find post created by this user
  const postFound = await Post.find({ user: userId });
  // console.log(postFound); //get all posts from a profile

  // get last post created by the user
  const lastPost = postFound[postFound.length - 1];
  // console.log(lastPost);

  // get last post date
  const lastPostDate = new Date(lastPost.createdAt);
  // console.log(lastPostDate);

  const lastPostDateToString = lastPostDate.toDateString();
  // console.log(lastPostDateToString);

  // add virtuals to the schema
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateToString;
  });
  next();
});
// post- after saving
// userSchema.post("save", function (next) {
//   next();
// });

// get fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// get initials of name
userSchema.virtual("initials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// get post counts
userSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

// get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

// get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

// get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewedBy.length;
});

// get blocked counts
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

// compile the user model

const User = mongoose.model("User", userSchema);

module.exports = User;

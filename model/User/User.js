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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Last Name is required"],
        ref: "Comment",
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

// // pre- before record is saved
// // /^find/--> findOne, find
// // check date for user last post

userSchema.pre("findOne", async function (next) {
  const userId = this._conditions._id;

  // Find posts created by this user
  const postFound = await Post.find({ user: userId });

  // If no posts are found, skip the rest of the hook
  if (postFound.length === 0) {
    return next();
  }

  // Get the last post created by the user
  const lastPost = postFound[postFound.length - 1];

  // Ensure lastPost exists before accessing createdAt
  if (!lastPost) {
    return next();
  }

  const lastPostDate = new Date(lastPost?.createdAt);
  const lastPostDateToString = lastPostDate.toDateString();

  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateToString;
  });

  const currentDate = new Date();
  const diff = currentDate - lastPostDate;
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  if (diffInDays > 30) {
    userSchema.virtual("isInactive").get(function () {
      return true;
    });
    await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
    await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  }

  // last active
  const daysAgo = Math.floor(diffInDays);
  userSchema.virtual("last active").get(function () {
    if (daysAgo <= 0) {
      return "Today";
    }
    if (daysAgo === 1) {
      return "Yesterday";
    }
    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    }
  });

  // // -----------------------------------------------
  // // update userAward based on the number of posts
  // // -----------------------------------------------

  const numberOfPosts = postFound.length;
  if (numberOfPosts < 10) {
    await User.findByIdAndUpdate(
      userId,
      { userAward: "Bronze" },
      { new: true }
    );
  }
  if (numberOfPosts > 10) {
    await User.findByIdAndUpdate(
      userId,
      { userAward: "Silver" },
      { new: true }
    );
  }
  if (numberOfPosts > 20) {
    await User.findByIdAndUpdate(userId, { userAward: "Gold" }, { new: true });
  }

  next();
});

// // -----------------------------------------------
// // update userAward based on the number of posts
// // -----------------------------------------------
// another method
// userSchema.post("init", function () {
//   // const userAward = this.userAward;
//   // console.log(userAward);
//   // get post count
//   const postCount = this.postCount;
//   // console.log(postCount);

//   if (postCount <= 10) {
//     // if numberOfPosts less than 10, let number of post remain bronze
//     this.userAward = "Bronze";
//   }
//   if (postCount > 10) {
//     this.userAward = "Silver";
//   } else if (postCount > 20) {
//     this.userAward = "Gold";
//   }
// });

//---------------------//
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

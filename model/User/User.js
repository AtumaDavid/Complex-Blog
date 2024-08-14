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

// // pre- before record is saved
// // /^find/--> findOne, find
// // check date for user last post
// userSchema.pre(/^find/, async function (next) {
//   // get the user id
//   // console.log(this);
//   const userId = this._conditions._id;

//   // find post created by this user
//   const postFound = await Post.find({ user: userId });
//   // console.log(postFound); //get all posts from a profile

//   // get last post created by the user
//   const lastPost = postFound[postFound.length - 1];
//   // console.log(lastPost);

//   // get last post date
//   const lastPostDate = new Date(lastPost.createdAt);
//   // console.log(lastPostDate);

//   const lastPostDateToString = lastPostDate.toDateString();
//   // console.log(lastPostDateToString);

//   // add virtuals to the schema
//   userSchema.virtual("lastPostDate").get(function () {
//     return lastPostDateToString;
//   });

//   // ----------------check if user is inactive for 30days-------------//
//   // get current date
//   const currentDate = new Date();
//   const diff = currentDate - lastPostDate;
//   const diffInDays = diff / (1000 * 2600 * 24);
//   // console.log(diffInDays);

//   if (diffInDays > 30) {
//     userSchema.virtual("isInactive").get(function () {
//       return true;
//     });

//     // find the user by ID and update
//     // await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
//   } else {
//     userSchema.virtual("isInactive").get(function () {
//       return false;
//     });
//     // find the user by ID and update
//     // await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
//   }

//   // last active date
//   const daysAgo = Math.floor(diffInDays);
//   // console.log(daysAgo);
//   userSchema.virtual("last active").get(function () {
//     if (daysAgo <= 0) {
//       return "Today";
//     }
//     if (daysAgo === 1) {
//       return "Yesterday";
//     }
//     if (daysAgo > 1) {
//       return `${daysAgo} days ago`;
//     }
//   });

//   // next();
// });

userSchema.pre(/^find/, async function (next) {
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

  const lastPostDate = new Date(lastPost.createdAt);
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
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
  }

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

  next();
});

// // -----------------------------------------------
// // update userAward based on the number of posts
// // -----------------------------------------------
userSchema.post("init", function () {
  // const userAward = this.userAward;
  // console.log(userAward);
  // get post count
  const postCount = this.postCount;
  // console.log(postCount);

  if (postCount < 1) {
    // if numberOfPosts less than 10, let number of post remain bronze
    this.userAward = "Bronze";
  }
  if (postCount > 1) {
    this.userAward = "Silver";
  }
});

// // -----------------------------------------------
// // block user inactive for 30days or more
// // -----------------------------------------------

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

const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const appErr = require("../../utils/appErr");
const Post = require("../../model/Post/Post");
const Comment = require("../../model/Comment/Comment");
const Category = require("../../model/Category/Category");

// register
module.exports.userRegisterController = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body; //from user model
  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res
        .status(500)
        .json({ status: "Error", message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      firstname,
      lastname,
      //   profilePhoto,
      email,
      //   password,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
    // next(new Error(error.message));
  }
};

// login
module.exports.userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(500)
        .json({ status: "Error", message: "Invalid login credentials" });
    }

    // verify password
    const isPasswordHashed = await bcrypt.compare(password, userFound.password);

    if (!isPasswordHashed) {
      return res
        .status(500)
        .json({ status: "Error", message: "Invalid login credentials" });
    }

    res.json({
      status: "Success",
      //   data: userFound,
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

// get all users
module.exports.getAllUserController = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "Success",
      data: users,
      // data: "all users",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// following controller
module.exports.followingController = async (req, res, next) => {
  try {
    // Find the user to be followed by ID from the request parameters
    const userToFollow = await User.findById(req.params.id);
    // Find the current user (who is trying to follow) from the authenticated user's ID
    const userWhoFollowed = await User.findById(req.user);

    // Check if both users exist in the database
    if (!userToFollow || !userWhoFollowed) {
      // If either user is not found, return a 404 error
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    // Check if the user is trying to follow themselves
    if (userToFollow._id.toString() === userWhoFollowed._id.toString()) {
      // If so, return a 400 error
      return res
        .status(400)
        .json({ status: "Error", message: "You cannot follow yourself" });
    }

    // Check if the current user is already following the target user
    const isUserAlreadyFollowed = userToFollow.followers.includes(
      userWhoFollowed._id
    );
    if (isUserAlreadyFollowed) {
      // If already following, return a 400 error
      return res
        .status(400)
        .json({ status: "Error", message: "You already followed this user" });
    }

    // Add the current user's ID to the followers array of the user to be followed
    userToFollow.followers.push(userWhoFollowed._id);
    // Add the target user's ID to the following array of the current user
    userWhoFollowed.following.push(userToFollow._id);

    // Save both user documents to the database concurrently
    await Promise.all([userToFollow.save(), userWhoFollowed.save()]);

    // Send a success response
    res.json({
      status: "Success",
      message: "You have successfully followed this user",
    });
  } catch (error) {
    // If any error occurs during the process, send a 500 error response
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// unfollow controller
module.exports.unfollowController = async (req, res, next) => {
  try {
    // Find the user to be unfollowed by ID from the request parameters
    const userToBeUnfollowed = await User.findById(req.params.id);
    // Find the current user (who is trying to unfollow) from the authenticated user's ID
    const userWhoUnfollowed = await User.findById(req.user);

    // Check if both users exist in the database
    if (!userToBeUnfollowed || !userWhoUnfollowed) {
      // If either user is not found, return a 404 error
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    // Check if the user is trying to unfollow themselves
    if (
      userToBeUnfollowed._id.toString() === userWhoUnfollowed._id.toString()
    ) {
      // If so, return a 400 error
      return res
        .status(400)
        .json({ status: "Error", message: "You cannot unfollow yourself" });
    }

    // Check if the current user is actually following the target user
    const isUserFollowed = userToBeUnfollowed.followers.includes(
      userWhoUnfollowed._id
    );
    if (!isUserFollowed) {
      // If not following, return a 400 error
      return res
        .status(400)
        .json({ status: "Error", message: "You are not following this user" });
    }

    // Remove the current user's ID from the followers array of the user to be unfollowed
    userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
      (follower) => follower.toString() !== userWhoUnfollowed._id.toString()
    );

    // Remove the target user's ID from the following array of the current user
    userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
      (following) => following.toString() !== userToBeUnfollowed._id.toString()
    );

    // Save both user documents to the database concurrently
    await Promise.all([userToBeUnfollowed.save(), userWhoUnfollowed.save()]);

    // Send a success response
    res.json({
      status: "Success",
      message: "You have successfully unfollowed the user",
    });
  } catch (error) {
    // If any error occurs during the process, send a 500 error response
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// who viewed my profile
module.exports.whoViewedMyProfileController = async (req, res, next) => {
  try {
    // Find the original user
    const user = await User.findById(req.params.id);

    // find the user who viewed the oroiginal user profile
    const userWhoViewed = await User.findById(req.user);

    // check if original user and who viewed are found
    if (user && userWhoViewed) {
      // check if userWhoViewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewedBy.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlreadyViewed) {
        return res.status(500).json({
          status: "Error",
          message: "You already viewed this profile",
        });
      } else {
        // push the userWhoViewed to thhe user's array
        user.viewedBy.push(userWhoViewed._id);

        // save the user
        await user.save();

        res.status(200).json({
          status: "Success",
          data: "you have viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

// get a user controller --profile
module.exports.getUserController = async (req, res) => {
  //   const { id } = req.params;
  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    // console.log(req.user);

    // const user = await User.findById(id);
    // req.user from "req.user = decodedUser.id" in isLogin middleware
    const user = await User.findById(req.user).populate({
      path: "posts",
    });
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update user
module.exports.updateUserController = async (req, res) => {
  const { email, lastname, firstname } = req.body;
  try {
    // check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res
          .status(404)
          .json({ status: "Error", message: "Email already taken" });
      }
    }
    // update th user
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        lastname,
        firstname,
        email,
      },
      {
        new: true,
        runValidation: true,
      }
    );
    // send response
    res.json({
      status: "Success",
      data: "user updated",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update user password
module.exports.updateUserPasswordController = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(
        req.user,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: "Success",
        data: "password has been changes successfully",
      });
    } else {
      return res
        .status(404)
        .json({ status: "Error", message: "Please provide password field" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete user account
module.exports.deleteUserController = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.user);

    // find all posts to be deleted
    await Post.deleteMany({ user: req.user });

    // find all comments and delete
    await Comment.deleteMany({ user: req.user });

    // find all categories and delete
    await Category.deleteMany({ user: req.user });

    // delete the user
    await userToDelete.deleteOne();

    res.json({
      status: "Success",
      data: "your account has been deleted",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// profile photo upload
module.exports.profilePhotoUploadController = async (req, res, next) => {
  console.log("req.user:", req.user);
  // console.log("req.userAuth:", req.userAuth);
  try {
    // Find the user to be updated
    const userToUpdate = await User.findById(req.user);

    // Check if user is found
    if (!userToUpdate) {
      // return next(appErr("User not found", 404)); // Use 404 for not found
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    // Check if user is blocked (by admin)
    if (userToUpdate.isBlocked) {
      // return next(appErr("Action not allowed, your account is blocked", 403));
      return res.status(403).json({
        status: "Error",
        message: "Action not allowed, your account is blocked",
      });
    }

    // Check if a file is uploaded
    if (req.file) {
      // Update profile photo
      await User.findByIdAndUpdate(
        req.user,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      // console.log("Updated user:", updatedUser);
      // console.log("req.user:", req.user);
      // console.log("req.userAuth:", req.userAuth);

      return res.json({
        status: "Success",
        data: "Profile photo updated",
      });
    } else {
      // Handle case where no file is uploaded
      // return next(appErr("No file uploaded", 400));
      return res.status(400).json({
        status: "Error",
        message: "No file uploaded",
      });
    }
  } catch (error) {
    // Pass error to the global error handler
    // return next(appErr(error.message, 500));
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
    // res.json(error.message);
  }
};

// block user
module.exports.blockUserController = async (req, res, next) => {
  try {
    // find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);

    // find the user who is blocking
    const userWhoBlocked = await User.findById(req.user);

    // check if userToBeBlocked and userWhoBlocked are found
    if (!userToBeBlocked || !userWhoBlocked) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    // check if userWhoBlocked is already in the user's blocked array
    const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
      (blocked) => blocked.toString() === userToBeBlocked._id.toString()
    );
    if (isUserAlreadyBlocked) {
      return res.status(400).json({
        status: "Error",
        message: "You have already blocked this user",
      });
    }

    // push userToBeBlocked to the userWhoBlocked's blocked array
    userWhoBlocked.blocked.push(userToBeBlocked._id);
    // save
    await userWhoBlocked.save();

    res.status(200).json({
      status: "Success",
      data: "You have successfully blocked this user",
    });
  } catch (error) {
    // next(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

// unblock user
module.exports.unBlockUserController = async (req, res, next) => {
  try {
    // find the user to be unblocked
    const userToBeUnblocked = await User.findById(req.params.id);

    // find the user who is unblocking
    const userWhoUnblocked = await User.findById(req.user);

    // check if userToBeUnblocked and userWhoUnblocked are found
    if (userToBeUnblocked && userWhoUnblocked) {
      // check if userWhoUnblocked is already in the user's blocked array
      const isUserAlreadyBlocked = userWhoUnblocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnblocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return res
          .status(400)
          .json({ status: "Error", message: "You have not blocked this user" });
      }
      // remove the userToBeUnblocked from the main user
      userWhoUnblocked.blocked = userWhoUnblocked.blocked.filter(
        (blocked) => blocked.toString() !== userToBeUnblocked._id.toString()
      );
      // save
      await userWhoUnblocked.save();

      res.status(200).json({
        status: "Success",
        data: "You have successfully unblocked this user",
      });
    }
  } catch (error) {
    // res.json(error.message);
    res.status(500).json(error.message);
  }
};

// admin-block
module.exports.adminBlockUserController = async (req, res, next) => {
  try {
    // find the user to be blocked by admin
    const userToBeBlocked = await User.findById(req.params.id);

    // check if user found
    if (!userToBeBlocked) {
      return res
        .status(500)
        .json({ status: "Error", message: "user not found" });
    }

    // change the isBlocked to true
    userToBeBlocked.isBlocked = true;

    // save
    await userToBeBlocked.save();
    res.json({
      status: "Success",
      data: "you have successfully blocked this user(admin)",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// admin--unblock
module.exports.adminUnblockUserController = async (req, res) => {
  try {
    // find the user to be unblocked by admin
    const userToBeUnblocked = await User.findById(req.params.id);

    // check if user found
    if (!userToBeUnblocked) {
      return res
        .status(500)
        .json({ status: "Error", message: "user not found" });
    }

    // change the isBlocked to false
    userToBeUnblocked.isBlocked = false;

    // save
    await userToBeUnblocked.save();
    res.json({
      status: "Success",
      data: "you have successfully unblocked this user(admin)",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// module.exports.blockUserController = async (req, res) => {
//   try {
//     res.json({
//       status: "Success",
//       data: "blocked",
//     });
//   } catch (error) {
//     res.json(error.message);
//   }
// };

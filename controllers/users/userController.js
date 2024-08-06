const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const appErr = require("../../utils/appErr");

// register
module.exports.userRegisterController = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body; //from user model
  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      // return res.json({
      //   msg: "User already exists",
      // });
      return next(appErr("User Already Exists", 500));
    }

    // hassh password
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
    // res.json(error.message);
    next(new Error(error.message));
  }
};

// login
module.exports.userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    // verify password
    const isPasswordHashed = await bcrypt.compare(password, userFound.password);

    if (!isPasswordHashed) {
      return res.json({
        msg: "Invalid login credentials",
      });
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
    res.json({
      status: "Success",
      data: "gotten all users",
    });
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
    const user = await User.findById(req.user);
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update user
module.exports.updateUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user updated",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete user
module.exports.deleteUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user deleted",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// profile photo upload
module.exports.profilePhotoUploadController = async (req, res, next) => {
  console.log("req.user:", req.user);
  console.log("req.userAuth:", req.userAuth);
  try {
    // Find the user to be updated
    const userToUpdate = await User.findById(req.user);

    // Check if user is found
    if (!userToUpdate) {
      return next(appErr("User not found", 404)); // Use 404 for not found
    }

    // Check if user is blocked (by admin)
    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowed, your account is blocked", 403));
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
      return next(appErr("No file uploaded", 400));
    }
  } catch (error) {
    // Pass error to the global error handler
    return next(appErr(error.message, 500));
    // res.json(error.message);
  }
};

// modoule.exports = {
//     userRegistrController
// }

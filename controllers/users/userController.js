const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

// register
module.exports.userRegisterController = async (req, res) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body; //from user model
  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        msg: "User already exists",
      });
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
    res.json(error.message);
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
  const { id } = req.params;
  try {
    const user = await User.findById(id);
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

// modoule.exports = {
//     userRegistrController
// }

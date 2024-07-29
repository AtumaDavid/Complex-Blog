// register
module.exports.userRegisterController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// login
module.exports.userLoginController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user logged in",
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

// get a user controller
module.exports.getUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "gotten users",
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

const User = require("../model/User/User");
const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdminMiddleware = async (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  if (!token) {
    return next(appErr("Invalid/Expired token, please login"), 500);
  }

  //   verifiy token
  const decodedUser = verifyToken(token);

  //   save the user into req obj
  const user = await User.findById(decodedUser.id);

  // check if admin
  if (user.isAdmin) {
    return next();
  } else {
    return next(appErr("Access Denied, admin only", 403));
  }
  //   if (!decodedUser) {
  //     return res.json({
  //       message: "Invalid/Expired token, please login",
  //     });
  //   }

  //   // save the user into req obj
  //   req.user = decodedUser.id; //user Id OF DECODED USER
  //   next();
};

module.exports = isAdminMiddleware;

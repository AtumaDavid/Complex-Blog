const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLoginMiddleware = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  if (!token) {
    // return res.json({
    //   message: "Invalid/Expired token, please login",
    // });
    return next(appErr("Invalid/Expired token, please login"), 500);
  }
  // else {
  //   next();
  // }

  // verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    return res.json({
      message: "Invalid/Expired token, please login",
    });
  }
  //   else {
  //     next();
  //   }

  // save the user into req obj
  req.user = decodedUser.id; //user Id OF DECODED USER
  next();
};

module.exports = isLoginMiddleware;

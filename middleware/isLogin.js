const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLoginMiddleware = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.json({
      message: "Invalid/Expired token, please login",
    });
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
  req.user = decodedUser;
  next();
};

module.exports = isLoginMiddleware;

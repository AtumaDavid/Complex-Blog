const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;

// This function is also used in the authentication middleware.
// It takes the token extracted by getTokenFromHeader and verifies its authenticity and expiration.

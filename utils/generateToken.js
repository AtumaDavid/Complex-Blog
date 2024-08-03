const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });
};

module.exports = generateToken;

// This function is typically used when a user logs in or registers.
// It creates a new token (usually a JWT) that contains encoded user information.
// It's used in login/registration routes.

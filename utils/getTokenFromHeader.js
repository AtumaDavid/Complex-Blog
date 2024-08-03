const getTokenFromHeader = (req) => {
  // get token from header
  const headerObject = req.headers;

  const token = headerObject["authorization"];
  if (token && token.startsWith("Bearer ")) {
    return token.slice(7); // Remove "Bearer " from the start
  }
  // return null;
  // console.log(token);

  if (token !== undefined) {
    return token;
  } else {
    return false;
  }
};

module.exports = getTokenFromHeader;

// This function is used in the authentication middleware.
// It extracts the token from the request headers, typically from the Authorization header.

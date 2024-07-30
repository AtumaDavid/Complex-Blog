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

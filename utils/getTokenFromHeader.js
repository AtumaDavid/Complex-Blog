const getTokenFromHeader = (req) => {
  // get token from header
  const headerObject = req.headers;

  const token = headerObject["authorization"];
  // console.log(token);

  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "failed",
      message: "There is no token attached to the header",
    };
  }
};

module.exports = getTokenFromHeader;

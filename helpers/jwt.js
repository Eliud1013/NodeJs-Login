const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  verifyToken,
};

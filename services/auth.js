const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./index");
const config = require("../config/index");
TABLE = "auth";

async function createUser(authData) {
  const salt = await bcrypt.genSalt(6);

  const data = {
    ...authData,
    password: await bcrypt.hash(authData.password, salt),
  };
  return await db.createUserAuth(TABLE, data);
}

async function login(username, password) {
  const query = `SELECT * FROM ${TABLE} WHERE username = "${username}";`;
  let data = await db.customQuery(query);
  data = data[0];
  const same = await bcrypt.compare(password, data.password);
  if (same) {
    const tokenData = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
    };
    const token = await jwt.sign(tokenData, config.secret, { expiresIn: "4h" });
    return {
      message: "OK",
      logged: true,
      token,
    };
  } else {
    return {
      message: "Invalid data",
      logged: false,
    };
  }
}

module.exports = {
  createUser,
  login,
};

const config = require("../config/index");
const db = require("../services/index");
const { verifyToken } = require("../helpers/jwt");

let id = "";

async function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
  const token = req.headers.authorization.split(" ").pop();
  const tokenData = await verifyToken(token, config.secret);
  console.log(tokenData);
  if (tokenData == undefined) {
    res.status(401).json({
      message: "Unauthorized Token",
    });
  } else if (tokenData.user_id) {
    id = tokenData.user_id;
    next();
  }
}

async function checkRoll(req, res, next) {
  const query = `SELECT roll FROM auth WHERE user_id = "${id}";`;
  let roll = await db.customQuery(query);
  roll = roll[0].roll;
}

module.exports = { checkAuth, checkRoll };

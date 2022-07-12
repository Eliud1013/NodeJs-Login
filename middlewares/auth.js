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

  const owner = req.query.id;

  const token = req.headers.authorization.split(" ").pop();
  const tokenData = await verifyToken(token, config.secret);

  if (tokenData.user_id == owner || tokenData.user_id == config.adminId) {
    id = tokenData.user_id;

    next();
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

async function checkRoll(req, res, next) {
  const query = `SELECT roll FROM auth WHERE user_id = "${id}";`;
  let roll = await db.customQuery(query);
  roll = roll[0].roll;

  if (roll == "admin") {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = { checkAuth, checkRoll };

const express = require("express");
const router = express.Router();
const authServices = require("../services/auth");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const login = await authServices.login(username, password);
    if (login.logged == false) {
      res.status(401).json({
        message: login.message,
        logged: login.logged,
      });
    } else {
      res.status(200).json({
        message: "OK",
        logged: login.logged,
        token: login.token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

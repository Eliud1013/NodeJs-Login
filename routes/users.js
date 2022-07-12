const express = require("express");
const router = express.Router();
const services = require("../services/users");
const { checkAuth, checkRoll } = require("../middlewares/auth");

router.get("/", checkAuth, checkRoll, async (req, res) => {
  if (req.query.id) {
    const { id } = req.query;
    console.log(id + "======");
    try {
      const user = await services.getUser(id);
      res.status(201).json({
        message: "User listed",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const users = await services.getUsers();
      res.status(200).json({
        message: "Users has been listed",
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/register", async (req, res) => {
  const { name, username, email, gender, password } = req.body;
  if (!name || !username || !email || !gender || !password) {
    return res.send("Missing Data");
  }
  try {
    const createdUser = await services.createUser(
      name,
      username,
      email,
      gender,
      password
    );

    if (createdUser.error) {
      res.status(400).json({
        message: createdUser.message,
        created: false,
      });
    } else {
      res.status(201).json({
        message: `User ${name} has been created`,
        created: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:update", checkAuth, async (req, res) => {
  const { id } = req.query;
  const data = req.body;

  try {
    const updatedUser = await services.updateUser(id, data);
    if (updatedUser.found == false) {
      res.status(404).json({
        message: "User id not found",
        updated: false,
      });
    } else {
      res.status(201).json({
        message: "User has been updated",
        updated: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:delete", checkAuth, async (req, res) => {
  const { id } = req.query;

  try {
    const deletedUser = await services.deleteUser(id);
    if (deletedUser.affectedRows == 0) {
      res.status(404).json({
        message: "User id not found",
        deleted: false,
      });
    } else {
      res.status(201).json({
        message: "User has been deleted",
        deleted: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

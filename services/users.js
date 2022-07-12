const { nanoid } = require("nanoid");
const db = require("./index");
const authServices = require("./auth");
const TABLE = "users";

function getUsers() {
  return db.getUsers(TABLE);
}
function getUser(id) {
  return db.getUser(TABLE, id);
}

async function createUser(name, username, email, gender, password) {
  if (gender != "F" && gender != "M" && gender !== "ND") {
    return {
      message: "Incorrect Data in gender",
      error: true,
    };
  }

  const userData = {
    user_id: nanoid(),
    name,
    username,
    email,
    gender,
  };
  const authData = {
    user_id: userData.user_id,
    username,
    email,
    password,
  };
  await authServices.createUser(authData);
  return db.createUser(TABLE, userData);
}

function updateUser(id, data) {
  if (data.gender) {
    if (gender != "F" && gender != "M" && gender !== "ND" && data.id) {
      return {
        message: "Incorrect Data in gender",
        error: true,
      };
    }
  }
  if (!data || !id) {
    return { message: "Missing data", error: true };
  } else {
    return db.updateUser(TABLE, id, data);
  }
}

function deleteUser(id) {
  return db.deleteUser(TABLE, id);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

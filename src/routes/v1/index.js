const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../../controllers/user-controller");

router.get("/users", getAllUsers);
router.get("/user/:userID", getUserByID);
router.post("/user/signup", createUser);
router.post("/user/signin", loginUser);
router.delete("/user/:userID", deleteUser);
router.patch("/user", updateUser);

module.exports = router;

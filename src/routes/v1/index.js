const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/user-controller");

router.get("/users", getAllUsers);
router.get("/user/:userID", getUserByID);
router.post("/user", createUser);
router.delete("/user/:userID", deleteUser);
router.patch("/user", updateUser);

module.exports = router;

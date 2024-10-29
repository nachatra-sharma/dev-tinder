const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser,
  getProfile,
  editProfile,
  editPassword,
} = require("../../controllers/user-controller");
const { authCheck } = require("../../middlewares/auth");

// user auth
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// user profile
router.get("/profile/view", authCheck, getProfile);
router.post("/profile/edit", authCheck, editProfile);
router.post("/profile/password", authCheck, editPassword);

// some random routes
router.get("/user", getAllUsers);
router.get("/user/:userID", getUserByID);
router.delete("/user/:userID", deleteUser);
router.patch("/user", updateUser);

module.exports = router;

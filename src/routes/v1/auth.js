const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers");

router.post("/signup", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;

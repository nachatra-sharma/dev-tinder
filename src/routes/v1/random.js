const express = require("express");
const router = express.Router();
const { randomController } = require("../../controllers");

router.get("/user", randomController.getAllUsers);
router.get("/user/:userID", randomController.getUserByID);
router.delete("/user/:userID", randomController.deleteUser);
router.patch("/user", randomController.updateUser);

module.exports = router;

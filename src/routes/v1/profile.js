const express = require("express");
const router = express.Router();
const { profileController } = require("../../controllers");
const { authCheck } = require("../../middlewares/auth");

router.get("/profile/view", authCheck, profileController.getProfile);
router.post("/profile/edit", authCheck, profileController.editProfile);
router.post("/profile/password", authCheck, profileController.editPassword);

module.exports = router;

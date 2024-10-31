const express = require("express");
const router = express();
const { connectionController } = require("../../controllers");
const { authCheck } = require("../../middlewares/auth");

router.post(
  "/request/send/:status/:userId",
  authCheck,
  connectionController.sendConnection
);

module.exports = router;

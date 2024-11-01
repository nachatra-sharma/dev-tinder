const express = require("express");
const router = express();
const { connectionController } = require("../../controllers");
const { authCheck } = require("../../middlewares/auth");

router.post(
  "/request/send/:status/:userId",
  authCheck,
  connectionController.sendConnection
);

router.post(
  "/request/review/:status/:requestId",
  authCheck,
  connectionController.chooseConnection
);

module.exports = router;

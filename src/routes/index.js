const express = require("express");
const router = express.Router();
const userV1 = require("./v1/index");

router.use("/v1", userV1);

module.exports = router;

const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const profileRouter = require("./profile");
const randomRouter = require("./random");

router.use("/v1", authRouter);
router.use("/v1", profileRouter);
router.use("/v1", randomRouter);

module.exports = router;

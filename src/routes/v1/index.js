const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const profileRouter = require("./profile");
const randomRouter = require("./random");
const connectionRouter = require("./connection");

router.use("/v1", authRouter);
router.use("/v1", profileRouter);
router.use("/v1", randomRouter);
router.use("/v1", connectionRouter);
module.exports = router;

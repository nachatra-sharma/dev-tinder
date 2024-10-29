const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectTODB = require("./config/database");
const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  await connectTODB(process.env.MONGODBURL);
  console.log("server is listening on PORT:", PORT);
});

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectTODB = require("./config/database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", router);

app.listen(PORT, async () => {
  await connectTODB(process.env.MONGODBURL);
  console.log("server is listening on PORT:", PORT);
});

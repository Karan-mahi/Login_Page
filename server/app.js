const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const dotenv = require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: "",
  port: process.env.PORT,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});
// Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000);

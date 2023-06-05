const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

// router.get("/", authController.isLoggedIn, (req, res) => {
//   // res.render("main.ejs", { root: './public/' })
//   res.render("main.ejs");
// });
// router.get("/register", (req, res) => {
//   res.render("register.ejs", { message: null, root: "./public/" });
// });
// router.get("/login", (req, res) => {
//   res.render("login.ejs", { message: null, root: "./public/" });
// });

router.get("/profile", authController.isLoggedIn, (req, res) => {
  return res.send(req.user);
});
module.exports = router;

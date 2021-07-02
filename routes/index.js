var express = require("express");
var router = express.Router();
var multer = require("multer");
const path = require("path");
var { loggedin, ensureAuth} = require("../middleware/ensureLogin")

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("index", { title: "Log Tracker | Login" });
});

/* GET Student Dashboard. */
router.get("/student", loggedin, function (req, res, next) {
  res.render("studentView", { title: "Student View | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Individual Project */
router.get("/student/eachProject", loggedin, function (req, res, next) {
  res.render("eachProject", { title: "Project | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Student Minutes */
router.get("/student/eachProject/addMinutes", loggedin, function (req, res, next) {
  res.render("addMinutes", { title: "Add Minutes | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET signup page. */
router.get("/signup", loggedin, function (req, res, next) {
  res.render("signup", { title: "Log Tracker | Sign Up" });
});

/* Logout Session. */
router.get("/logout", loggedin, function (req, res, next) {
  req.logout();
  res.redirect("/");
});


module.exports = router;

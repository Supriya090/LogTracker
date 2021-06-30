var express = require("express");
var router = express.Router();

//to verify login and protecting from login bypass
var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Log Tracker | Login" });
});

/* GET Student Dashboard. */
router.get("/student", function (req, res, next) {
  res.render("studentView", { title: "Student View | Log Tracker" });
});

/* GET Individual Project */
router.get("/student/eachProject", function (req, res, next) {
  res.render("eachProject", { title: "Project | Log Tracker" });
});

/* GET Student Minutes */
router.get("/student/eachProject/addMinutes", function (req, res, next) {
  res.render("addMinutes", { title: "Add Minutes | Log Tracker" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Log Tracker | Sign Up" });
});

/* GET Admin Dashboard. */
router.get("/dashboard", loggedin, function (req, res, next) {
  res.send(req.session);
});

/* Logout Session. */
router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});


module.exports = router;

var express = require("express");
var router = express.Router();

//to verify login
var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
//to protecting from login bypass
var ensureAuth = function(req, res, next){
  if(!req.isAuthenticated()) {
    return next();
  }else {
    res.redirect("/student");
  }
};

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("index", { title: "Log Tracker | Login" });
});

/* GET Student Dashboard. */
router.get("/student", loggedin, function (req, res, next) {
  res.render("studentView", { title: "Student View | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Individual Project */
router.get("/student/eachProject", function (req, res, next) {
  res.render("eachProject", { title: "Project | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Student Minutes */
router.get("/student/eachProject/addMinutes", function (req, res, next) {
  res.render("addMinutes", { title: "Add Minutes | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Teacher Dashboard. */
router.get("/teacher", loggedin, function (req, res, next) {
  res.render("teacherView", { title: "Teacher View | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET Teacher's Individual Project*/
router.get("/teacher/eachProject", function (req, res, next) {
  res.render("eachProjectTeacher", { title: "Project | Log Tracker", firstname: req.user.username.split(' ')[0] });
});

/* GET signup page. */
router.get("/signup", ensureAuth, function (req, res, next) {
  res.render("signup", { title: "Log Tracker | Sign Up" });
});

/* Logout Session. */
router.get("/logout", loggedin, function (req, res, next) {
  req.logout();
  res.redirect("/");
});


module.exports = router;

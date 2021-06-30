var express = require("express");
var router = express.Router();
var multer = require("multer");
const path = require("path");


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
  res.render("eachProject", { title: "Project | Log Tracker" });
});

/* GET Student Minutes */
<<<<<<< HEAD
router.get("/student/addMinutes", loggedin, function (req, res, next) {
=======
router.get("/student/eachProject/addMinutes", function (req, res, next) {
>>>>>>> Branch1
  res.render("addMinutes", { title: "Add Minutes | Log Tracker" });
});

/* Displays data added in minutes in console & saves uploaded files in uploads */
<<<<<<< HEAD
router.post("/save", loggedin, upload.array("uploadedFiles", 10), function (req, res) {
  if (req.files) {
    console.log(req.files);
    console.log("files uploaded");
  }
  console.log(req.body);
  res.redirect("/student");
});
=======
// router.post("/save", upload.array("uploadedFiles", 10), function (req, res) {
//   if (req.files) {
//     console.log(req.files);
//     console.log("files uploaded");
//   }
//   console.log(req.body);
//   res.redirect("/student");
// });
>>>>>>> Branch1

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

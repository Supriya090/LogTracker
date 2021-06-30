var express = require("express");
var router = express.Router();
var User = require("../models/User")


//to verify login
var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
//to protecting from login bypass
var ensureAuth = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/dashboard");
  }
};

/* GET Dashboard. */
router.get("/dashboard", loggedin, function (req, res, next) {
  // User.getUser(req.user.username)
  User.findOne({
    username: req.user.username
  }, function (err, user) {
    console.log(user._id)
    if (err) {
      return next(err)
    } else if (user) {
      if (user.userstatus == "student") {
        res.render("studentView", {
          title: "Student View | Log Tracker",
          firstname: user.username.split(' ')[0]
        });
      } else if (user.userstatus == "admin") {
        // res.render('/admin')
        res.send(user);
      } else if (user.userstatus == "teacher") {
        // res.redirect('/teacher')
        res.send(user);
      }

    }
  })

});


/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("index", {
    title: "Log Tracker | Login"
  });
});

/* GET signup page. */
router.get("/signup", ensureAuth, function (req, res, next) {
  res.render("signup", {
    title: "Log Tracker | Sign Up"
  });
});

/* Logout Session. */
router.get("/logout", loggedin, function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;

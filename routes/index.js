var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Minute = require("../models/Minute");
var Comment = require("../models/Comment");
var { loggedin, ensureAuth } = require("../middleware/ensureLogin");

/* GET Dashboard. */
router.get("/dashboard", loggedin, function (req, res, next) {
  //console.log(req.body);
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
      } else if (user.userstatus == "teacher") {
        // res.render('/teacher')
        res.render("teacherView", {
          title: "Teacher View | Log Tracker",
          firstname: user.username.split(' ')[0]
        });
        // res.send(user);
      } else if (user.userstatus == "admin") {
        // res.redirect('/admin')
        res.render("adminView", {
          title: "Admin View | Log Tracker",
          firstname: user.username.split(' ')[0]
        });
        // res.send(user);
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

/* GET Individual Project */
router.get("/student/eachProject", loggedin, function (req, res, next) {
  Minute.getMinutesbyPid('todo', function (err, minutes) {
    if (err) {
      return next(err)
    }
    else {
      Comment.find({}, function (err, cmt) {
        if (err) {
          console.log(err);
        } else {
          res.render('eachProject', { minutes: minutes.reverse(), comments: cmt.reverse(), title: "Project | Log Tracker", username: req.user.username, firstname: req.user.username.split(' ')[0] });
        }
      })
    }
  })
});


/* GET Student Minutes */
router.get("/student/eachProject/addMinutes", loggedin, function (req, res, next) {
  res.render("addMinutes", {
    title: "Add Minutes | Log Tracker",
    firstname: req.user.username.split(' ')[0]
  });
});


/* GET Teacher's Individual Project*/
router.get("/teacher/eachProject", loggedin, function (req, res, next) {
  Minute.getMinutesbyPid('todo', function (err, minutes) {
    if (err) {
      return next(err)
    }
    else {
      Comment.find({}, function (err, cmt) {
        if (err) {
          console.log(err);
        } else {
          res.render('eachProjectTeacher', { minutes: minutes.reverse(), comments: cmt.reverse(), title: "Project | Log Tracker", username: req.user.username, firstname: req.user.username.split(' ')[0] });
        }
      })
    }
  })
});

/* GET Admin Create Team */
router.get("/admin/createTeam", loggedin, function (req, res, next) {
  res.render("createTeam", {
    title: "Create Team | Log Tracker",
    firstname: req.user.username.split(' ')[0]
  });
});


/* GET signup page. */
router.get("/signup", loggedin, function (req, res, next) {
  User.findOne({
    username: req.user.username
  }, function (err, user) {
    console.log(user._id)
    if (err) {
      return next(err)
    }
    else if (user) {
      if (user.userstatus == "admin") {
        res.render("signup", {
          title: "Log Tracker | Sign Up"
        });
      }
      else {
        res.redirect("/dashboard")
      }
    }
  });
});


/* Logout Session. */
router.get("/logout", loggedin, function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
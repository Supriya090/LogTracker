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

router.get('/download', function(req, res){
  const fileData = req.body.data
  const fileName = 'download'
  const fileType = req.body.content

  res.writeHead(200, {
    'Content-Disposition': `attachment; filename="${fileName}"`,
    'Content-Type': fileType,
  })

  const download = Buffer.from(fileData, 'base64')
  res.end(download)
  // res.download(req.body.file);
});


/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("index", {
    title: "Log Tracker | Login"
  });
});

/* GET Student Dashboard. */
// router.get("/student", loggedin, function (req, res, next) {
//   res.render("studentView", { title: "Student View | Log Tracker", firstname: req.user.username.split(' ')[0] });
// });

/* GET Individual Project */
router.get("/student/eachProject", function (req, res, next) {
  res.render("eachProject", {
    title: "Project | Log Tracker",
    firstname: req.user.username.split(' ')[0]
  });
});

/* GET Student Minutes */
router.get("/student/eachProject/addMinutes", function (req, res, next) {
  res.render("addMinutes", {
    title: "Add Minutes | Log Tracker",
    firstname: req.user.username.split(' ')[0]
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
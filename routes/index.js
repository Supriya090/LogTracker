var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Minute = require("../models/Minute");
var Comment = require("../models/Comment");
var Project = require("../models/Project");
var Event = require("../models/Event");
var Faculty = require("../models/Faculty");
var File = require("../models/File")
var { loggedin, ensureAuth } = require("../middleware/ensureLogin");

/* GET Dashboard. */
router.get("/dashboard", loggedin, function (req, res, next) {
  user = req.user
  // userdetail = req.session.passport.user
  // console.log(userdetail);
  if (user.userstatus == "student") {
    Project.getProjectsbyUser(
      user.username + ':' + user.email,
      function (err, projects) {
        if (err) {
          return next(err);
        } else {
          res.render("projectView", {
            title: "Student View | Log Tracker",
            message: req.flash('message'),
            projects: projects,
            // sem: user.level.split(':')[1],
            userstatus: user.userstatus,
            userlevel: user.level,
            firstname: user.username.split(" ")[0],
          });
        }
      }
    );
  } else if (user.userstatus == "teacher") {
    Project.getProjectsbySV(user.username + ':' + user.email, function (err, projects) {
      if (err) {
        return next(err);
      } else {
        res.render("projectView", {
          title: "Teacher View | Log Tracker",
          message: req.flash('message'),
          projects: projects,
          // sem: user.level.split(':')[1],
          userstatus: user.userstatus,
          firstname: user.username.split(" ")[0],
        });
      }
    });

    // res.send(user);
  } else if (user.userstatus == "admin") {
    Project.getProjectsbyCreator(
      user.email,
      function (err, projects) {
        if (err) {
          return next(err);
        } else {
          res.render("projectView", {
            projects: projects,
            message: req.flash('message'),
            title: "Admin View | Log Tracker",
            userstatus: user.userstatus,
            // sem: user.level.split(':')[1],
            firstname: user.username.split(" ")[0],
          });
        }
      }
    );
  }

});

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("index", {
    title: "Log Tracker | Login",
    message: req.flash('message')
  });
});

/* GET Individual Project */
router.get("/student/eachProject/:pId", loggedin, function (req, res, next) {
  console.log(req.params.pId);
  user = req.user
  Project.findById(req.params.pId, function (err, project) {
    if (err) {
      console.log(err);
    } else {
      Minute.getMinutesbyPid(req.params.pId, function (err, minutes) {
        if (err) {
          return next(err);
        } else {
          Comment.find({}, function (err, cmt) {
            if (err) {
              console.log(err);
            } else {
              Event.getEventsbyPid(req.params.pId, function (err, events) {
                if (err) {
                  return next(err);
                } else {
                  console.log(project)
                  res.render("eachProject", {
                    message: req.flash('message'),
                    project: project,
                    events: events.reverse(),
                    minutes: minutes.reverse(),
                    comments: cmt,
                    title: "Student View | Each Project | Log Tracker",
                    pId: req.params.pId,
                    username: user.username,
                    firstname: user.username.split(" ")[0],
                    userstatus: user.userstatus
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});



/* GET Student Minutes */
router.get(
  "/student/eachProject/addMinutes/:pId",
  loggedin,
  function (req, res, next) {
    res.render("addMinutes", {
      title: "Add Minutes | Log Tracker",
      message: req.flash('message'),
      pId: req.params.pId,
      firstname: req.user.username.split(" ")[0],
    });
  }
);

router.get(
  "/student/eachProject/addProjectRepo/:pId",
  loggedin,
  function (req, res, next) {
    res.render("addFiles", {
      title: "Add Approved Files | Log Tracker",
      message: req.flash('message'),
      pId: req.params.pId,
      firstname: req.user.username.split(" ")[0],
    });
   
   
  }
);

router.get(
  "/student/eachProject/projectRepo/:pId",
  loggedin,
  function (req, res, next) {
    File.getFilesbyProjectId(req.params.pId, function (err, files) {
      console.log("............",files)
      res.render("projectFiles", {
        files: files,
        title: "Approved Files | Log Tracker",
        message: req.flash('message'),
        pId: req.params.pId,
        firstname: req.user.username.split(" ")[0],
      });
    });
  
  }
);

router.get(
  "/student/eachProject/editMinutes/:pId/:mId",
  loggedin,
  function (req, res, next) {
    Minute.findById(req.params.mId, function (err, minute) {
      res.render("editMinutes", {
        message: req.flash('message'),
        minute: minute,
        title: "Edit Minutes | Log Tracker",
        pId: req.params.pId,
        firstname: req.user.username.split(" ")[0],
      });
    })

  }
);



router.get(
  "/admin/editTeam/:pId",
  loggedin,
  function (req, res, next) {
    user = req.user
    if (user.userstatus == "admin") {
      User.find({}, function (err, usr) {
        Faculty.find({}, function (err, faculty) {
          if (err) {
            console.log(err);
          } else {
            Project.findById(req.params.pId, function (err, project) {
              res.render("editTeam", {
                message: req.flash('message'),
                users: usr,
                faculty: faculty,
                project: project,
                title: "Edit Team | Log Tracker",
                pId: req.params.pId,
                firstname: req.user.username.split(" ")[0],
              });
            });

          }
        });
      })

    } else {
      res.redirect("/dashboard");
    }

  }
);

router.get(
  "/admin/defenseCall",
  loggedin,
  function (req, res, next) {
    user = req.user
    Faculty.find({}, function (err, faculty) {
      if (err) {
        console.log(err);
      } else {
        res.render("defenseCall", {
          message: req.flash('message'),
          users: user,
          faculty: faculty,
          title: "Defence Call | Log Tracker",
          pId: req.params.pId,
          firstname: req.user.username.split(" ")[0],
        });

      }
    });



  }
);

/* GET Teacher's Individual Project*/
router.get("/teacher/eachProject/:pId", loggedin, function (req, res, next) {
  user = req.user
  Project.findById(req.params.pId, function (err, project) {
    if (err) {
      console.log(err);
    } else {
      Minute.getMinutesbyPid(req.params.pId, function (err, minutes) {
        if (err) {
          return next(err);
        } else {
          Comment.find({}, function (err, cmt) {
            if (err) {
              console.log(err);
            } else {
              Event.getEventsbyPid(req.params.pId, function (err, events) {
                if (err) {
                  return next(err);
                } else {
                  console.log(project)
                  res.render("eachProject", {
                    message: req.flash('message'),
                    project: project,
                    events: events.reverse(),
                    minutes: minutes.reverse(),
                    comments: cmt.reverse(),
                    title: "Teacher View | Each Project | Log Tracker",
                    pId: req.params.pId,
                    username: user.username,
                    firstname: user.username.split(" ")[0],
                    userstatus: user.userstatus
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

/* GET Admin Create Team */
router.use("/signup", function (req, res, next) {  //!loggedin, 
  res.render("signup", {
    title: "Log Tracker | Sign Up",
    message: req.flash('message')
  });
});

/* GET signup page. */
router.get("/admin/createTeam", loggedin, function (req, res, next) {
  user = req.user
  if (user.userstatus == "admin") {
    User.find({}, function (err, usr) {
      Faculty.find({}, function (err, faculty) {
        if (err) {
          console.log(err);
        } else {
          res.render("createTeam", {
            message: req.flash('message'),
            users: usr,
            faculty: faculty,
            title: "Create Team | Log Tracker",
            firstname: req.user.username.split(" ")[0],
          });
        }
      });
    })

  } else {
    res.redirect("/dashboard");
  }

});

/* GET Admin Each Project */
/* Todo: Fix Routing */
router.get("/admin/eachProject/:pId", loggedin, function (req, res, next) {
  user = req.user
  Minute.getMinutesbyPid(req.params.pId, function (err, minutes) {
    if (err) {
      return next(err);
    } else {
      Event.getEventsbyPid(req.params.pId, function (err, events) {
        if (err) {
          return next(err);
        } else {
          Project.getProjectsbyId(req.params.pId, function (err, project) {
            if (err) {
              console.log(err);
            } else {
              res.render("eachProject", {
                message: req.flash('message'),
                project: project,
                events: events.reverse(),
                minutes: minutes.reverse(),
                //comments: cmt.reverse(),
                title: "Admin View | Each Project | Log Tracker",
                pId: req.params.pId,
                username: user.username,
                firstname: user.username.split(" ")[0],
                userstatus: user.userstatus
              });
            }
          });
        }
      });
    }
  });
});

/* Logout Session. */
router.get("/logout", loggedin, function (req, res, next) {
  req.logout();
  req.flash('message', 'Logged Out Successfully')
  res.redirect("/");
  // res.render("index", {
  //   title: "Log Tracker | Login",
  //   message: req.flash('message', 'Logged Out Successfully')
  // });
});

module.exports = router;

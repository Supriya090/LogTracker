var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Minute = require("../models/Minute");
var Comment = require("../models/Comment");
var Project = require("../models/Project");
var Event = require("../models/Event");
var { loggedin, ensureAuth } = require("../middleware/ensureLogin");

/* GET Dashboard. */
router.get("/dashboard", loggedin, function (req, res, next) {
  user = req.session.user
  // console.log(user.map['075bct064'])
        if (user.userstatus == "student") {
          Project.getProjectsbyUser(
            user.username+':'+user.email,
            function (err, projects) {
              if (err) {
                return next(err);
              } else {
                res.render("projectView", {
                  title: "Student View | Log Tracker",
                  projects: projects,
                  sem: user.level.split(':')[1],
                  userstatus: user.userstatus,
                  firstname: user.username.split(" ")[0],
                });
              }
            }
          );
        } else if (user.userstatus == "teacher") {
          Project.getProjectsbySV(user.username+':'+user.email, function (err, projects) {
            if (err) {
              return next(err);
            } else {
              res.render("projectView", {
                title: "Teacher View | Log Tracker",
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
  });
});

/* GET Individual Project */
router.get("/student/eachProject/:pId", loggedin, function (req, res, next) {
  console.log(req.params.pId);
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
                    project: project,
                    events: events.reverse(),
                    minutes: minutes.reverse(),
                    comments: cmt,
                    title: "Project | Log Tracker",
                    pId: req.params.pId,
                    username: req.user.username,
                    firstname: req.user.username.split(" ")[0],
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
      pId: req.params.pId,
      firstname: req.user.username.split(" ")[0],
    });
  }
);

router.get(
  "/student/eachProject/editMinutes/:pId/:mId",
  loggedin,
  function (req, res, next) {
    Minute.findById(req.params.mId, function (err, minute) {
      res.render("editMinutes", {
        minute: minute,
        title: "Edit Minutes | Log Tracker",
        pId: req.params.pId,
        firstname: req.user.username.split(" ")[0],
      });
    })

  }
);

/* GET Teacher's Individual Project*/
router.get("/teacher/eachProject/:pId", loggedin, function (req, res, next) {
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
                  res.render("eachProjectTeacher", {
                    project: project,
                    events: events.reverse(),
                    minutes: minutes.reverse(),
                    comments: cmt.reverse(),
                    title: "Project | Log Tracker",
                    pId: req.params.pId,
                    username: req.user.username,
                    firstname: req.user.username.split(" ")[0],
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
router.use("/signup", function (req, res, next) {
  res.render("signup", {
    title: "Log Tracker | Sign Up",
  });
});

/* GET signup page. */
router.get("/admin/createTeam", loggedin, function (req, res, next) {
  user = req.session.user
        if (user.userstatus == "admin") {
          User.find({}, function (err, usr) {
            if (err) {
              console.log(err);
            } else {
              res.render("createTeam", {
                users: usr,
                title: "Create Team | Log Tracker",
                firstname: req.user.username.split(" ")[0],
              });
            }
          });
        } else {
          res.redirect("/dashboard");
        }
    
});

/* GET Admin Each Project */
/* Todo: Fix Routing */
router.get("/admin/eachProject/:pId", loggedin, function (req, res, next) {
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
              res.render("eachProjectAdmin", {
                project: project,
                events: events.reverse(),
                minutes: minutes.reverse(),
                //comments: cmt.reverse(),
                title: "Project | Log Tracker",
                pId: req.params.pId,
                username: req.user.username,
                firstname: req.user.username.split(" ")[0],
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
  res.redirect("/");
});

module.exports = router;

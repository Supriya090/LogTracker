var express = require("express");
var router = express.Router();
var Project = require("../models/Project");
var Event = require("../models/Event");
var { loggedin } = require("../middleware/ensureLogin");

router.post("/createteams", function (req, res, next) {
  //console.log(teamname)
  var projectname = req.body.projectname;
  var description = req.body.description;
  // var std = req.body.std;
  var teamname = req.body.teamname;
  var semester = req.body.sems;
  var username = req.user.username;
  (supervisor = [req.body.supervisor1, req.body.supervisor2]),
    (team = [
      req.body.std1,
      req.body.std2,
      req.body.std3,
      req.body.std4,
      req.body.std5,
    ]);
  // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
  if (!projectname) {
    errors.push({
      msg: "Please fill in all fields",
    });
  }

  const project = new Project();
  project.projectname = projectname;
  project.description = description;
  project.supervisor = supervisor;
  project.team = team;
  project.createdBy = req.session.user.email;
  project.updatedBy = req.session.user.email;
  project.faculty = faculty;
  project.semester = semester;
  project.subject = subject;
  project.teamname = teamname;
  Project.createProject(project, function (err, projects) {
    //Save to database
    if (err) {
      console.log(err);
      res.status(500).send("Database error occured");
    } else {
      res.redirect("/dashboard");
    }
  });
});

router.post("/editteams/:pId", function (req, res, next) {
  pId = req.params.pId;
  var projectname = req.body.projectname;
  var description = req.body.description;
  // var std = req.body.std;
  var teamname = req.body.teamname;
  var semester = req.body.sems;
  var username = req.user.username;
  (supervisor = [req.body.supervisor1, req.body.supervisor2]),
    (team = [
      req.body.std1,
      req.body.std2,
      req.body.std3,
      req.body.std4,
      req.body.std5,
    ]);
  // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
  if (!projectname) {
    errors.push({
      msg: "Please fill in all fields",
    });
  }

  const project = new Project();
  project.projectname = projectname;
  project.description = description;
  project.supervisor = supervisor;
  project.team = team;
  project.createdBy = req.session.user.email;
  project.updatedBy = req.session.user.email;
  project.faculty = faculty;
  project.semester = semester;
  project.subject = subject;
  project.teamname = teamname;
  console.log(project)
  Project.updateProject(pId, project, function (err, projects) {
    //Save to database
    if (err) {
      console.log(err);
      res.status(500).send("Database error occured");
    } else {
      res.redirect("/dashboard");
    }
  });
});

router.post("/event/save/:pId", (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    let errors = [];

    var title = req.body.title;
    var dueDate = new Date(req.body.eventDate);
    dueDate.setHours(23);
    dueDate.setMinutes(59);
    dueDate.setSeconds(59);
    var description = req.body.description;
    var pId = req.params.pId;
    if (!title) {
      errors.push({
        msg: "Add event field cannot be empty!",
      });
    }

    // var mId = mongoose.Types.ObjectId(req.params.mId);

    const event = new Event();
    event.projectId = pId;
    event.event = title;
    event.dueDate = dueDate;
    event.createdBy = req.user.username;
    event.description = description;
    console.log(event);

    Event.createEvent(event, function (err, events) {
      //Save to database
      if (err) {
        console.log(err);
        req.flash("message", "Error Saving Event");
        if (req.session.user.userstatus == "student") {
          res.redirect("/student/eachProject/".concat(pId));
        } else if (req.session.user.userstatus == "teacher") {
          res.redirect("/teacher/eachProject/".concat(pId));
        }
      } else {
        req.flash("message", "Event Added");
        if (req.session.user.userstatus == "student") {
          res.redirect("/student/eachProject/".concat(pId));
        } else if (req.session.user.userstatus == "teacher") {
          res.redirect("/teacher/eachProject/".concat(pId));
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/defenceComment/:pId", (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    let errors = [];

    var pId = req.params.pId;

    Project.findById(pId, function (err, project) {
      //Save to database
      console.log(project)
      if (err) {
        console.log(err);
        res.status(500).send("Database error occured");
      } else {
        if(project.midDefence.approved==true){
          var message ={
            comment:req.body.cmt,
            option: "final",
            commentedBy:req.user.username,
          }
        }else{
          var message ={
            comment:req.body.cmt,
            option: "mid",
            commentedBy:req.user.username,
          }
        }
        Project.comment(pId,message,function (err) {
          //Save to database
          if (err) {
            console.log(err);
            res.status(500).send("Database error occured");
          }else{
            if (req.session.user.userstatus == "student") {
              res.redirect("/student/eachProject/".concat(pId));
            } else if (req.session.user.userstatus == "teacher") {
              res.redirect("/teacher/eachProject/".concat(pId));
            }
          }
        })

      }
    })
  } catch (err) {
    console.error(err);
  }
});

router.post("/requestApproveDefence/:pId", loggedin, (req, res, next) => {
  pId = req.params.pId;
  userstatus = req.session.user.userstatus;
  console.log(userstatus);
  var message =req.body.message
  Project.findById(pId, function (err, project) {
    //Save to database
    console.log(project)
    if (err) {
      console.log(err);
      res.status(500).send("Database error occured");
    } else {
      if (project.midDefence.approved == true) {
        
        if ((userstatus == "student")) {
          Project.requestFinalDefence(pId,message, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          });
        }
        else if ((userstatus == "teacher")) {
          Project.approveFinalDefence(pId, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          });
        }
      
      }else {
        if ((userstatus == "student")) {
          Project.requestMidDefence(pId,message, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          });
        }
        else if ((userstatus == "teacher")) {
          Project.approveMidDefence(pId, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          });
        }
      }
      if (req.session.user.userstatus == "student") {
        res.redirect("/student/eachProject/".concat(pId));
      } else if (req.session.user.userstatus == "teacher") {
        res.redirect("/teacher/eachProject/".concat(pId));
      }
    }
    
  });
});

router.post("/defenseCall", loggedin, (req, res, next) => {
  userstatus = req.session.user.userstatus;
  console.log(req.body);

  var defense ={
    date:new Date(req.body.defenseDate),
    time:req.body.defenseTime,
    term:req.body.terms,
  }

  Project.find({faculty: req.body.faculty, subject: req.body.subject, semester: req.body.sems}, function (err, projects) {
    //Save to database
    console.log(projects)
    if (err) {
      console.log(err);
      res.status(500).send("Database error occured");
    } else {
      projects.forEach(project => {
        if (defense.term == "mid") {
          Project.callMidDefence(project._id,defense,function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          })
        } else if (defense.term == "final") {
          Project.callFinalDefence(project._id,defense,function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send("Database error occured");
            }
          })
        }
      });
        res.redirect("/dashboard")
    }
    
  });
});


router.use("/event/completed/:pId/:id", loggedin, (req, res, next) => {
  Event.Completed(req.params.id, function (err, events) {
    var pId = req.params.pId;
    if (err) {
      req.flash("message", "Cannot Complete task : ".concat(err));
      return next(err);
    } else {
      req.flash("message", "Task Completed");
      if (req.session.user.userstatus == "student") {
        res.redirect("/student/eachProject/".concat(pId));
      } else if (req.session.user.userstatus == "teacher") {
        res.redirect("/teacher/eachProject/".concat(pId));
      }
    }
  });
});

router.use("/event/remaining/:pId/:id", loggedin, (req, res, next) => {
  Event.Remaining(req.params.id, function (err, events) {
    var pId = req.params.pId;
    if (err) {
      req.flash("message", "Cannot Complete task : ".concat(err));
      return next(err);
    } else {
      if (req.session.user.userstatus == "student") {
        res.redirect("/student/eachProject/".concat(pId));
      } else if (req.session.user.userstatus == "teacher") {
        res.redirect("/teacher/eachProject/".concat(pId));
      }
    }
  });
});

module.exports = router;

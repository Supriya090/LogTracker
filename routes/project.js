var express = require("express");
var router = express.Router();
var Project = require("../models/Project");
var Event = require("../models/Event");
var { loggedin } = require("../middleware/ensureLogin")


router.post("/createteams", function (req, res, next) {
//console.log(teamname)
    var projectname = req.body.projectname;
    var description= req.body.description;
    // var std = req.body.std;
    var teamname = req.body.teamname;
    var semester = req.body.sems;
    var username = req.user.username;
    supervisor= [req.body.supervisor1,req.body.supervisor2],
    team= [req.body.std1,req.body.std2,req.body.std3,req.body.std4,req.body.std5]
    // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
    if (!projectname) {
              errors.push({
                msg: "Please fill in all fields"
              });
            }

            const project = new Project()
            project.projectname = projectname
            project.description = description
            project.supervisor = supervisor
            project.team = team
            project.createdBy = req.session.user.email
            project.semester = semester
            project.teamname = teamname
            Project.createProject(project, function (err, projects) {
              //Save to database
              if (err) {
                console.log(err)
                req.flash('message', "Error Creating Teams")
                res.redirect("/project/createteams")
                // res.status(500).send("Database error occured");
              } else {
                req.flash('message', "Team Created")
                res.redirect('/dashboard')
              }
            }
            )
          
})

router.post('/event/save/:pId',(req, res, next) => {
  try {
    console.log(JSON.stringify(req.body))
    let errors = [];

    var title = req.body.title
    var dueDate = new Date(req.body.eventDate)
    dueDate.setHours(23)
    dueDate.setMinutes(59)
    dueDate.setSeconds(59)
    var description = req.body.description
    var pId = req.params.pId
    if (!title) {
      errors.push({
        msg: "Add event field cannot be empty!"
      });
    }

    // var mId = mongoose.Types.ObjectId(req.params.mId);

    const event = new Event()
    event.projectId = pId
    event.event = title
    event.dueDate = dueDate
    event.createdBy = req.user.username
    event.description = description
    console.log(event);

    Event.createEvent(event, function (err, events) {
      //Save to database
      if (err) {
        console.log(err)
        req.flash('message', "Error Saving Event")
        if (req.session.user.userstatus == 'student'){
          res.redirect('/student/eachProject/'.concat(pId))
        }else if(req.session.user.userstatus == 'teacher'){
        res.redirect('/teacher/eachProject/'.concat(pId))
        }   
      } else {
        req.flash('message', "Event Added")
        if (req.session.user.userstatus == 'student'){
          res.redirect('/student/eachProject/'.concat(pId))
        }else if(req.session.user.userstatus == 'teacher'){
        res.redirect('/teacher/eachProject/'.concat(pId))
        }
      }
    }
    )
  }
  
  catch (err) {
    console.error(err)
    req.flash('message', "Unexpected error : ".concat(err))
    if (req.session.user.userstatus == 'student'){
      res.redirect('/student/eachProject/'.concat(pId))
    }else if(req.session.user.userstatus == 'teacher'){
    res.redirect('/teacher/eachProject/'.concat(pId))
    }
  }

})

router.use('/event/completed/:pId/:id', loggedin, (req, res, next) => {
  Event.Completed(req.params.id, function (err, events) {
    var pId = req.params.pId
    if (err) {
      req.flash('message','Cannot Complete task : '.concat(err))
      return next(err)
    } else {
      req.flash('message','Task Completed')
      if (req.session.user.userstatus == 'student'){
        res.redirect('/student/eachProject/'.concat(pId))
      }else if(req.session.user.userstatus == 'teacher'){
      res.redirect('/teacher/eachProject/'.concat(pId))
    }
        }
      })
})

router.use('/event/remaining/:pId/:id', loggedin, (req, res, next) => {
  Event.Remaining(req.params.id, function (err, events) {
    var pId = req.params.pId
    if (err) {
      req.flash('message','Cannot Complete task : '.concat(err))
      return next(err)
    } else {
      if (req.session.user.userstatus == 'student'){
        res.redirect('/student/eachProject/'.concat(pId))
      }else if(req.session.user.userstatus == 'teacher'){
      res.redirect('/teacher/eachProject/'.concat(pId))
    }
        }
      })
})

module.exports = router;

var express = require("express");
var router = express.Router();
var Project = require("../models/Project");
var Event = require("../models/Event");


router.post("/createteams", function (req, res, next) {
console.log(teamname)
    var projectname = req.body.projectname;
    var description= req.body.description;
    // var std = req.body.std;
    var teamname = req.body.teamname;
    var semester = req.body.sems;
    var username = req.user.username;
    var supervisor= req.body.supervisor,
    team= [req.body.std1,req.body.std2,req.body.std3,req.body.std4,req.body.std5]
    // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
    if (!projectname) {
              errors.push({
                msg: "Please sfill in all fields"
              });
            }

            const project = new Project()
            project.projectname = projectname
            project.description = description
            project.supervisor = supervisor
            project.team = team
            project.createdBy = username
            project.semester = semester
            project.teamname = teamname

            Project.createProject(project, function (err, projects) {
              //Save to database
              if (err) {
                console.log(err)
                res.status(500).send("Database error occured");
              } else {
                res.send(projects);
              }
            }
            )
          
})

router.post('/event/save/:pId',(req, res, next) => {
  try {
    console.log(JSON.stringify(req.body))
    let errors = [];

    var title = req.body.title
    var dueDate = req.body.dueDate
    var pId = req.body.pId

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
    event.commentedBy = req.user.username

    // console.log(req.user.username)

    Event.createEvent(event, function (err, events) {
      //Save to database
      if (err) {
        res.status(500).send("Database error occured");
      } else {
        res.redirect('/minute/getall')
      }
    }
    )
  }
  
  catch (err) {
    console.error(err)

  }

})




module.exports = router;

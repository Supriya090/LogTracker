var express = require("express");
var router = express.Router();
var Project = require("../models/Project");


router.post("/createteams", function (req, res, next) {

    var projectname = req.body.projectname;
    var description= req.body.description;
    var std = req.body.std;
    var supervisor = req.body.supervisor;
    var events = req.body.events;
    var semester = req.body.sems;
    var username = req.user.username;
    if (!projectname) {
              errors.push({
                msg: "Please sfill in all fields"
              });
            }
        
            const project = new Project()
            //minute.projectId = "project id"
            project.projectname = projectname
            project.description = description
            //project.member.team = "Ranju"
            // project.member.supervisor = "supervisor"
            var member = {
                supervisor: req.body.supervisor,
                team: req.body.std,
              }
            project.member = member
            project.createdBy = username
            project.semester = semester
            project.events = events

            Project.createProject(project, function (err, projects) {
              //Save to database
              if (err) {
                res.status(500).send("Database error occured");
              } else {
                res.send(projects);
              }
            }
            )
          
})

module.exports = router;
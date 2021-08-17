var express = require("express");
var router = express.Router();
var Faculty = require("../models/Faculty");

//process minute form
// POST /minutes/add

router.use(
  "/save",
  (req, res, next) => {
    //console.log("save")
    try {
      console.log(JSON.stringify(req.body));


      const faculty = new Faculty();
      faculty.name = "Mechanical Engineering";
      faculty.courses = [{
      //   semester: 1,
      //   subjects: ["Mathematics I", "Computer Programming", "Engineering Drawing I", "Engineering Physics", "Applied Mechanics", "Basic Electrical Engineering"]
      // }, {
      //   semester: 2,
      //   subjects: ["Mathematics II", "Engineering Drawing II", "Fundamental of Thermodynamics", "Engineering Chemistry", "Basic Electronics Engineering", "Workshop Technology"]
      // }, {
      //   semester: 3,
      //   subjects: ["Mathematics III", "Object Oriented Programming", "Theory of Computation", "Electric Circuit Theory", "Electronics Devices and Circuit", "Digital Logic", "Electromagnetics"]
      // }, {
      //   semester: 4,
      //   subjects: ["Electrical Machine", "Numerical Method", "Applied Mathematics", "Instrumentation I", "Data Structure and Algorithm", "Microprocessor", "Discrete Structure"]
      // }, {
      //   semester: 5,
      //   subjects: ["Communication English", "Probability and Statistics", "Software Engineering", "Instrumentation II", "Computer organization and Architecture", "Computer Graphics", "Data Communication"]
      // }, {
      //   semester: 6,
      //   subjects: ["Engineering Economics", "Embedded System", "Artificial Intelligence", "Database Managrement System", "Object Oriented Analysis & Design", "Operating System", "Minor Project"]
      // }, {
      //   semester: 7,
      //   subjects: ["Project Management", "Organization and Management", "Energy Enviroment and Society", "Computer Network", "Distributed System", "Digital Signal Analysis & Processing", "Elective I", "Final Project"]
      // }, {
      //   semester: 8,
      //   subjects: ["Engineeering Professional Practice", "Information Systems", "Simulation and Modeling", "Internet and Intranet", "Elective II", "Elective III", "Final Project"]
      },]

      Faculty.addFaculty(faculty, function (err, faculty) {
        //Save to database
        if (err) {
          // res.status(500).send(err);
          req.flash('message', "Error Saving Minute")
          // res.redirect("/student/eachProject/" + pId);
        } else {
          req.flash('message', "Minute Added")
          // res.redirect("/student/eachProject/" + pId);
          res.send(faculty)
        }
      });
    } catch (err) {
      req.flash('message', "Unexpected error".concat(err))
      // res.redirect("/student/eachProject/" + pId);
      // res.render(err);
      // res.redirect("/student/eachProject");
      // res.render
    }
  }
);


router.use("/getall", async (req, res, next) => {
  const all = await Faculty.find({})
  global.faculty = all;
});



module.exports = router;

//TO-DO
var express = require("express");
var router = express.Router();
var Faculty = require("../models/Faculty");

//process minute form
// POST /minutes/add

router.use(
  "/save",
  (req, res, next) => {
    try {
      console.log("save")
      console.log(JSON.stringify(req.body));

      const faculty = new Faculty();
      faculty.name = "Aerospace Engineering";
      faculty.courses = [{
        semester: 1,
        subjects: ["Mathematics I", "Applied Mechanics", "Engineering Drawing", "Engineering Physics", "Basic Electrical Engineering", "Workshop Technology"]
      }, {
        semester: 2,
        subjects: ["Mathematics II", "Engineering Drawing II", "Basic Electronics Engineering", "Engineering Chemistry", "C Programming", "Fundamental of Thermodynamics & Heat Transfer"]
      }, {
        semester: 3,
        subjects: ["Applied Thermodynamics and Heat Transfer", "Computer Aided Design and Manufacturing", "Engineering Mechanics", "Fluid Mechanics", "Fundamental of Aerospace Engineering", "Engineering Mathemathics III"]
      }, {
        semester: 4,
        subjects: ["Theory of Mechanism and Machine I", "Aerodynamics", "Aerospace Materials", "Control System", "Probabillity and Statistics", "Strength of Materials"]
      }, {
        semester: 5,
        subjects: ["Aircraft Manufacturing Process", "Aircraft Propulsion", "Continuum Mechanics", "Fault Monitoring and Diagnosis", "Numerical Methods", "Theory of Vibration"]
      }, {
        semester: 6,
        subjects: ["Avionics", "Finite Element Method", "Aircraft Maintenance Engineering", "Aircraft Environment Control System", "Flight Dynamics", "Unmanned Air Vehicle Synthesis"]
      }, {
        semester: 7,
        subjects: ["Aircraft Preliminary Design", "Computational Fluid Dynamics", "Air Traffic Management", "Aircraft Structures", "Embedded Systems in Avionics", "Project(Part I)", "Elective I"]
      }, {
        semester: 8,
        subjects: ["Internship", "Aviation Professional Practices", "Factor in Aviation", "Elective II", "Elective III", "Project(Part II)"]
      },]

      Faculty.addFaculty(faculty, function (err, faculty) {
        //Save to database
        if (err) {
          // res.status(500).send(err);
          req.flash('message', "Error Saving Minute")
          // res.redirect("/student/eachProject/" + pId);
        } else {
          req.flash('message', "Subjects Added")
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
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
      faculty.name = "Computer Engineering";
      faculty.courses = [{
        semester: 1,
        subjects: ["Mathematics I", "Computer Programming", "Engineering Drawing I", "Engineering Physics", "Applied Mechanics", "Basic Electrical Engineering"]
      }, {
        semester: 2,
        subjects: ["Mathematics II", "Engineering Drawing II", "Fundamental of Thermodynamics", "Engineering Chemistry", "Basic Electronics Engineering", "Workshop Technology"]
      }, {
        semester: 3,
        subjects: ["Mathematics III", "Object Oriented Programming", "Theory of Computation", "Electric Circuit Theory", "Electronics Devices and Circuit", "Digital Logic", "Electromagnetics"]
      }, {
        semester: 4,
        subjects: ["Electrical Machine", "Numerical Method", "Applied Mathematics", "Instrumentation I", "Data Structure and Algorithm", "Microprocessor", "Discrete Structure"]
      }, {
        semester: 5,
        subjects: ["Communication English", "Probability and Statistics", "Software Engineering", "Instrumentation II", "Computer organization and Architecture", "Computer Graphics", "Data Communication"]
      }, {
        semester: 6,
        subjects: ["Engineering Economics", "Embedded System", "Artificial Intelligence", "Database Managrement System", "Object Oriented Analysis & Design", "Operating System", "Minor Project"]
      }, {
        semester: 7,
        subjects: ["Project Management", "Organization and Management", "Energy Enviroment and Society", "Computer Network", "Distributed System", "Digital Signal Analysis & Processing", "Elective I", "Final Project"]
      }, {
        semester: 8,
        subjects: ["Engineeering Professional Practice", "Information Systems", "Simulation and Modeling", "Internet and Intranet", "Elective II", "Elective III", "Final Project"]
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

// var ID = function () {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return "_" + Math.random().toString(36).substr(2, 9);
// };

// router.use("/getall/:pId", loggedin, (req, res, next) => {
//   res.redirect("/student/eachProject/" + req.params.pId);
// });

// router.get("/download", function (req, response) {
//   console.log(req.query);
//   Minute.findOne(
//     {
//       "attachment.fileId": req.query.data,
//     },
//     function (err, minute) {
//       if (err) {
//         return next(err);
//       } else {
//         minute.attachment.forEach((element) => {
//           if (element.fileId == req.query.data) {
//             let fileType = element.docs.contentType;
//             let fileName = element.name.substring(
//               element.name.indexOf("-") + 1
//             );
//             let fileData = element.docs.data;

//             var fileContents = Buffer.from(fileData, "base64");
//             var readStream = new stream.PassThrough();
//             readStream.end(fileContents);

//             response.set(
//               "Content-disposition",
//               "attachment; filename=" + fileName
//             );
//             response.set("Content-Type", fileType);

//             readStream.pipe(response);
//           }
//         });
//       }
//     }
//   );
// });

// router.post("/edit/:pId/:mId", (req, res, next) => {
//   try {
//     console.log(JSON.stringify(req.body));
//     let errors = [];

//     var title = req.body.title;
//     var description = req.body.description;
//     var pId = req.params.pId;

//     if (!title || !description) {
//       errors.push({
//         msg: "Please fill in all fields",
//       });
//     }

//     const minute = new Minute();
//     minute.title = title;
//     minute.description = description;
//     minute.updatedBy = req.user.username;
//     console.log(minute);

//     Minute.updateMinute(req.params.mId, minute, function (err, minutes) {
//       //Save to database
//       if (err) {
//         // res.status(500).send(err);
//         req.flash('message', "Error Editing Minute")
//         res.redirect("/student/eachProject/" + pId);
//       } else {
//         req.flash('message', "Minute Edited Successfully")
//         res.redirect("/student/eachProject/".concat(pId));
//       }
//     });
//   } catch (err) {
//     req.flash('message', "Unexpected error".concat(err))
//     res.redirect("/student/eachProject/" + pId);
//     // res.render(err);
//     // res.redirect("/student/eachProject");
//     // res.render
//   }
// });

// router.use("/verify/:pId/:id", loggedin, (req, res, next) => {
//   Minute.verifyMinute(req.params.id, function (err, minutes) {
//     if (err) {
//       return next(err);
//     } else {
//       res.redirect("/teacher/eachProject/" + req.params.pId);
//     }
//   });
// });

// router.use("/unverify/:pId/:id", loggedin, (req, res, next) => {
//   Minute.unVerifyMinute(req.params.id, function (err, minutes) {
//     if (err) {
//       return next(err);
//     } else {
//       res.redirect("/teacher/eachProject/" + req.params.pId);
//     }
//   });
// });

module.exports = router;

//TO-DO
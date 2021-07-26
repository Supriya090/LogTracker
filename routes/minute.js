var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");
var Comment = require("../models/Comment");
var path = require("path");
var fs = require("fs");
var upload = require("../middleware/multer");
var { loggedin } = require("../middleware/ensureLogin");
var stream = require("stream");

var commentRouter = require("./comment");

router.use("/comment", commentRouter);

//process minute form
// POST /minutes/add

router.post(
  "/save/:pId",
  upload.array("uploadedFiles", 10),
  (req, res, next) => {
    //console.log("save")
    try {
      console.log(JSON.stringify(req.body));
      let errors = [];

      console.log(req.files);
      console.log(req.files.length);

      var title = req.body.title;
      var description = req.body.description;
      var pId = req.params.pId;
      var img = new Array();
      console.log(pId);

      for (let i = 0; i < req.files.length; i++) {
        var file = {
          name: req.files[i].filename,
          fileId: ID(),
          docs: {
            data: fs.readFileSync(
              path.join(
                __dirname,
                ".." + "/public/uploads/" + req.files[i].filename
              )
            ),
            contentType: req.files[i].mimetype,
          },
        };
        img.push(file);
        console.log(title);
      }
      if (!title || !description) {
        errors.push({
          msg: "Please fill in all fields",
        });
      }

      const minute = new Minute();
      minute.projectId = pId;
      minute.title = title;
      minute.description = description;
      minute.attachment = img;
      minute.createdBy = req.user.username;
      minute.createdDate = Date.now()
      Minute.createMinute(minute, function (err, minutes) {
        //Save to database
        if (err) {
          res.status(500).send(err);
        } else {
          res.redirect("/student/eachProject/" + pId);
        }
      });
    } catch (err) {
      res.render(err);
      // res.redirect("/student/eachProject");
      // res.render
    }
  }
);

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

router.use("/getall/:pId", loggedin, (req, res, next) => {
  res.redirect("/student/eachProject/" + req.params.pId);
});

router.get("/download", function (req, response) {
  console.log(req.query);
  Minute.findOne(
    {
      "attachment.fileId": req.query.data,
    },
    function (err, minute) {
      if (err) {
        return next(err);
      } else {
        minute.attachment.forEach((element) => {
          if (element.fileId == req.query.data) {
            let fileType = element.docs.contentType;
            let fileName = element.name.substring(
              element.name.indexOf("-") + 1
            );
            let fileData = element.docs.data;

            var fileContents = Buffer.from(fileData, "base64");
            var readStream = new stream.PassThrough();
            readStream.end(fileContents);

            response.set(
              "Content-disposition",
              "attachment; filename=" + fileName
            );
            response.set("Content-Type", fileType);

            readStream.pipe(response);
          }
        });
      }
    }
  );
});

router.post("/edit/:pId/:mId", (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    let errors = [];

    var title = req.body.title;
    var description = req.body.description;
    var pId = req.params.pId;

    if (!title || !description) {
      errors.push({
        msg: "Please fill in all fields",
      });
    }

    const minute = new Minute();
    minute.title = title;
    minute.description = description;
    minute.updatedBy = req.user.username;
    console.log(minute);

    Minute.updateMinute(req.params.mId, minute, function (err, minutes) {
      //Save to database
      if (err) {
        console.log(err);
        res.status(500).send("Database error occured");
      } else {
        res.redirect("/student/eachProject/".concat(pId));
      }
    });
  } catch (err) {
    res.render(err);
    // res.redirect("/student/eachProject");
    // res.render
  }
});

router.use("/verify/:pId/:id", loggedin, (req, res, next) => {
  Minute.verifyMinute(req.params.id, function (err, minutes) {
    if (err) {
      return next(err);
    } else {
      res.redirect("/teacher/eachProject/" + req.params.pId);
    }
  });
});

router.use("/unverify/:pId/:id", loggedin, (req, res, next) => {
  Minute.unVerifyMinute(req.params.id, function (err, minutes) {
    if (err) {
      return next(err);
    } else {
      res.redirect("/teacher/eachProject/" + req.params.pId);
    }
  });
});

module.exports = router;

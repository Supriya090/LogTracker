var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");
var path = require("path");
var fs = require('fs');
var upload = require("../middleware/multer")
var { loggedin } = require("../middleware/ensureLogin")

//process minute form
// POST /minutes/add

router.post('/save', upload.array('uploadedFiles', 10), async (req, res, next) => {
  console.log("save")
  try {
    console.log(JSON.stringify(req.body))
    let errors = [];

    console.log(req.files)
    console.log(req.files.length)

    var title = req.body.title
    var description = req.body.description
    var img = new Array()

    for (let i = 0; i < req.files.length; i++) {
      var file = {
        name: req.files[i].filename,
        fileId: ID(),
        docs: {
          data: fs.readFileSync(path.join(__dirname, '..' + '/public/uploads/' + req.files[i].filename)),
          contentType: req.files[i].mimetype
        }
      }
      img.push(file)

    }
    console.log(title)

    if (!title || !description) {
      errors.push({
        msg: "Please fill in all fields"
      });
    }

    const minute = new Minute()
    //minute.projectId = "project id"
    minute.title = title
    minute.description = description
    minute.attachment = img
    minute.createdBy = req.user.username
    Minute.createMinute(minute, function (err, minutes) {
      //Save to database
      if (err) {
        res.status(500).send("Database error occured");
      } else {
        res.redirect("/student/eachProject");
      }
    }
    )
  }
  catch (err) {
    console.error(err)
    res.redirect("/student/eachProject");
    // res.render

  }

})

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

router.use('/getall', loggedin, (req, res, next) => {
  Minute.getMinutesbyPid('todo', function (err, minutes) {
    if (err) {
      return next(err)
    } else {
      res.render('viewMinutes.ejs', {
        minutes: minutes,
        msg: "Get All Minutes"
      });
    }
  })
})


router.get('/download', function (req, res) {
  console.log(req.query)
  Minute.findOne({
    "attachment.fileId": req.query.data
  }, function (err, minute) {
    if (err) {
      return next(err)
    } else {
      minute.attachment.forEach(element => {
        if (element.fileId == req.query.data) {
    
          let fileType = element.docs.contentType
          let fileName = (element.name).substring((element.name).indexOf('-') + 1);
          let fileData = element.docs.data
    
          var fileContents = Buffer.from(fileData, "base64");
          DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads/');
          var savedFilePath = path.join(DOWNLOAD_DIR + fileName)
          fs.writeFile(savedFilePath, fileContents, function () {
            res.status(200).download(savedFilePath, fileName);
          });
        }
  })
  }
});
});

module.exports = router;
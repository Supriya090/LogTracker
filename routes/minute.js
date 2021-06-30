var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");
var multer  = require('multer')
var path = require("path");
var fs = require('fs');
var upload = require("../middleware/multer")

//process minute form
// POST /minutes/add

router.post('/save', upload.array('uploadedFiles',10),(req, res, next) =>{
    console.log("save")
    try
    {
      console.log(JSON.stringify(req.body))
        let errors = [];

        console.log(req.files)
        console.log(req.files.length)

        var title = req.body.title
        var description = req.body.description
        var img = new Array()

        for (let i = 0; i < req.files.length; i++) {
          var file = {
            name:req.files[i].filename,
            docs:{
                  data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files[i].filename)),
                  contentType: req.files[i].mimetype
            }
          }
          img.push(file)  
          
        }
        console.log(title)

        if (!title || !description) {
            errors.push({ msg: "Please fill in all fields" });
        }

        const minute = new Minute()
        // minute.projectId = "project id"
        minute.title = title
        minute.description = description
        minute.attachment = img
        // minute.createdBy = "user"

        Minute.createMinute(minute,function (err, minutes) {
            //Save to database
            if (err) {
              res.status(500).send("Database error occured");
            } else {
              res.send(minutes);
            }
          }
        )
    }
    catch(err)
    {
        console.error(err)
        res.redirect("/student");
        // res.render

    }
    
})

router.use('/getall', (req, res, next) => {
    Minute.getMinutesbyPid('todo',function(err, minutes){
if (err) 
{
  return next(err)
}
else{
  res.render('viewMinutes.ejs',{minutes: minutes, msg:"Get All Minutes"});
}
    })
})

module.exports = router;

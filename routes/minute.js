var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");
var multer  = require('multer')
var path = require("path");
var fs = require('fs');
var upload = require("../middleware/multer")

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ 
    host: 'ipfs.infura.io', 
    port: 5001, 
    protocol: 'https' 
});

//process minute form
// POST /minutes/add

router.post('/save', upload.array('uploadedFiles',10), async(req, res, next) =>{
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
          var data = fs.readFileSync(path.join(__dirname, '..' + '/public/uploads/' + req.files[i].filename))
          // let reader = new fs.FileReader();
          // reader.readAsArrayBuffer(data);
          const filehash = await addFile(data);
          let url="https://ipfs.io/ipfs/"+filehash;
          // return res.send(url.toString())
          var file = {
            name:req.files[i].filename,
            docs:{
                  url: filehash,
                  contentType: req.files[i].mimetype
            }
          }
          img.push(file)  
          
        }
        // console.log(title)

        if (!title || !description) {
            errors.push({ msg: "Please fill in all fields" });
        }

        const minute = new Minute()
        //minute.projectId = "project id"
        minute.title = title
        minute.description = description
        minute.attachment = img
        minute.createdBy = req.user.username

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

const addFile = async(content) =>{
  const fileAdded = await ipfs.files.add(Buffer.from(content))
  console.log(fileAdded[0])
  return fileAdded[0].hash

}

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

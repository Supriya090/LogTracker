var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");

//show add page
// GET /minutes/add

router.get('/add', (req, res) =>{
    res.render('minutes/add')
})

//process minute form
// POST /minutes/add

router.post('/', (req, res) =>{
    try
    {
        let errors = [];

        var body = req.body,
        title = body.title,
        description = body.description;

        if (!title || !description) {
            errors.push({ msg: "Please fill in all fields" });
        }

        const minute = new Minute()
        minute.users = ["aaa","bbb","ccc","ddd","eee"]
        minute.projectname = "project name"
        minute.title = title
        minute.description = description
        minute.createdBy = req.user.username

        Minute.createMinute(minute,function (err, resultminute) {
            //Save to database
            if (err) {
              res.status(500).send("Database error occured");
            } else {
              res.send(resultminute);
            }
          }
        )
    }
    catch(err)
    {
        console.error(err)
        // res.render

    }
    res.render('minutes/add')
})

router.use('/getminutes', (req, res, next)) =>{
    Minute.
}



module.exports = router;

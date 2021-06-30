var express = require("express");
var router = express.Router();
var Minute = require("../models/Minute");


/* GET Student Dashboard. */
router.get("/", function (req, res, next) {
    res.render("studentView", { title: "Student View | Log Tracker" });
});

/* GET Student Minutes */
router.get("/eachProject/addMinute", function (req, res, next) {
    res.render("addMinutes", { title: "Add Minutes | Log Tracker" });
});


router.use('/eachProject', (req, res, next) => {
    Minute.getMinutesbyPid('todo', function (err, minutes) {
        if (err) {
            return next(err)
        }
        else {
            res.render('eachProject', { minutes: minutes, title: "Project | Log Tracker" });
        }
    })
})

module.exports = router;

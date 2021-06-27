var express = require("express");
var router = express.Router();
var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Log Tracker | Login" });
});

router.get("/student", function (req, res, next) {
  res.render("studentView", { title: "Student View | Log Tracker" });
});

router.get("/student/addMinutes", function (req, res, next) {
  res.render("addMinutes", { title: "Add Minutes | Log Tracker" });
});

router.post("/save", upload.array("uploadedFiles", 10), function (req, res) {
  if (req.files) {
    console.log(req.files);
    console.log("files uploaded");
  }
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;

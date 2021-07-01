var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment");
var path = require("path");

//process comment form
// POST /comment/save

router.post('/save',(req, res, next) => {
  try {
    console.log(JSON.stringify(req.body))
    let errors = [];

    var cmt = req.body.cmt

    if (!cmt) {
      errors.push({
        msg: "Comment field cannot be empty!"
      });
    }

    const comment = new Comment()
    //minute.projectId = "project id"
    comment.comment = cmt
    minute.createdBy = req.user.username

    Comment.createComment(comment, function (err, comments) {
      //Save to database
      if (err) {
        res.status(500).send("Database error occured");
      } else {
        res.send(comments);
      }
    }
    )
  }
  catch (err) {
    console.error(err)
    res.send(comments);
    // res.render

  }

})


router.use('/getall', (req, res, next) => {
  Comment.getCommentsbyId('minuteid', function (err, comments) {
    if (err) {
      return next(err)
    } else {
      res.send(comments)
    }
  })
})

router.use('/delete', (req, res, next) => {
    Comment.deleteComment('commentid', function (err, comments) {
      if (err) {
        return next(err)
      } else {
        res.send(comments)
      }
    })
  })
  
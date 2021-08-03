var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment");
var mongoose = require('mongoose');
var { loggedin } = require("../middleware/ensureLogin");


//process comment form
// POST /comment/save

router.post('/save/:mId/:pId',(req, res, next) => {
  var pId = req.params.pId
  try {
    console.log(JSON.stringify(req.body))
    let errors = [];

    var cmt = req.body.cmt

    if (!cmt) {
      errors.push({
        msg: "Comment field cannot be empty!"
      });
    }

    var mId = mongoose.Types.ObjectId(req.params.mId);

    const comment = new Comment()
    comment.minuteId = mId
    comment.comment = cmt
    comment.commentedBy = req.user.username

    // console.log(req.user.username)

    Comment.createComment(comment, function (err, comments) {
      //Save to database
      if (err) {
        res.status(500).send("Database error occured");
      } else {
        if (req.session.user.userstatus == 'student'){
          res.redirect('/student/eachProject/'.concat(pId))
        }else if(req.session.user.userstatus == 'teacher'){
        res.redirect('/teacher/eachProject/'.concat(pId))
      }
      }
    }
    )
  }
  
  catch (err) {
    console.error(err)

  }

})

router.use('/getall', loggedin, (req, res, next) => {
  Comment.getCommentsbyId('minuteid', function (err, comments) {
    if (err) {
      return next(err)
    } else {
      res.send(comments)
    }
  })
})

router.use('/delete/:id/:pId', loggedin, (req, res, next) => {
  var pId = req.params.pId
  console.log(req.params.id)
  Comment.findById({_id:req.params.id}, function (err, cmt) {
    if (cmt.commentedBy==req.user.username) {
      Comment.deleteComment(req.params.id, function (err) {
        if (err) {
          return next(err)
        } else {
          if (req.session.user.userstatus == 'student'){
            res.redirect('/student/eachProject/'.concat(pId))
          }else if(req.session.user.userstatus == 'teacher'){
          res.redirect('/teacher/eachProject/'.concat(pId))
        }
        }
      })
    } 
  })
    
  })
  
  module.exports = router;
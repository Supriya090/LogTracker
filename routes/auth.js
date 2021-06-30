var express = require("express")
var router = express.Router();
var User = require("../models/User")

module.exports = function (passport) {
  //RN for Admin Signup but can be later used to create account for students and teacher
  router.post("/signup", function (req, res) {
    let errors = []

    var body = req.body,
      username = body.username,
      password = body.password,
      status = body.userstatus

      if (!username || !password) {
        errors.push({ msg: "Please fill in all fields" })
      }

    User.findOne({ username: username }, function (err, doc) {
      if (err) {
        res.status(500).send("error occured")
      } //mongoose or database error
      else {
        if (doc) {
          res.status(500).send("Username already exists") //if user with same username already exist
        } else {
          //Create new user
          var record = new User()
          record.username = username
          record.password = record.hashPassword(password) //access method
          record.userstatus = status
          record.save(function (err, user) {
            //Save to database
            if (err) {
              res.status(500).send("Database error occured")
            } 
            else if(status=="admin")
            {
              res.render('/admin')
              res.send(user);
            }
            else if(status=="teacher")
            {
              res.redirect('/teacher')
              res.send(user);
            }
            else if(status=="student")
            {
              res.redirect('/student',{username: username})
            }
          });
        }
      }
    });
  });

  //For Login using local strategy
  router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/",
      successRedirect: "/dashboard",
      failureFlash: true,
    }),
    function (req, res) {
      res.send("Welcome");
    }
  );
  return router;
};

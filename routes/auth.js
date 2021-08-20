var express = require("express");
var router = express.Router();
var User = require("../models/User");

module.exports = function (passport) {
  router.post("/signup", function (req, res) {
    let errors = [];

    var body = req.body,
      email = body.email,
      username = body.username,
      password = body.password,
      status = body.userstatus;
      level = body.level

    if (!username || !password || !email) {
      errors.push({ msg: "Please fill in all fields" });
    }

    User.findOne({ email: email }, function (err, doc) {
      if (err) {
        // res.status(500).send("error occured");
        req.flash('message', 'Could Not Add You !! DataBase may be Down !')
        res.redirect('/signup')
      } //mongoose or database error
      else {
        if (doc) {        
          req.flash('message', 'Email is already Registered!\n Please login to continue!')
          res.redirect('/signup') //if user with same username already exist
        } else {
          //Create new user
          var record = new User();
          record.email = email;
          record.username = username;
          record.password = record.hashPassword(password); //access method
          record.userstatus = status;
          record.level = level
          record.save(function (err, user) {
            //Save to database
            if (err) {
              console.log(err)
              req.flash('message', 'Error Occured in adding you')
              // res.status(500).send("Database error occured");
            } else {
              // res.render('/admin')
              error = 'Email Already Registered!'
              req.flash('message', error)
              res.redirect("/");
            }
          });
        }
      }
    });
  });

  // For Login using local strategy
    router.post(
      "/login",
      passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/dashboard",
        failureFlash: true,
      })
    );
    return router;
  };

  
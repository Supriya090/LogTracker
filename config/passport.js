var localStrategy = require("passport-local").Strategy;
var User = require("../models/User");

module.exports = function (passport) {
  //Add user to Session
  passport.serializeUser(function (user, done) {
    done(null, user); //err = null
  });
  //Remove User from Session
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new localStrategy(
      //{ usernameField:"", passwordField:"" }
      function (email, password, done) {
        //done is used to verify callback
        //Our Strategy goes here (find in database)
        User.findOne(
          {
            email: email,
          },
          function (err, doc) {
            if (err) {
              done(err);
              console.log("Error Logging !!");
            } else {
              if (doc) {
                global.userdetail = doc;
                console.log(userdetail)
                //document is present
                var valid = doc.comparePassword(password, doc.password);
                // console.log(doc)
                if (valid) {
                  done(null, {
                    email: doc.email,
                    username: doc.username,
                    password: doc.password,
                    status: doc.userstatus,
                  });
                } else {
                  console.log("Incorrect Password");
                  return done(null, false, {
                    message: "Incorrect password",
                  });
                }
              } else {
                console.log("User not found");
                return done(null, false, {
                  message: "User not found",
                });
              }
            }
          }
        );
      }
    )
  );
};


//to verify login
var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  };
  //to protecting from login bypass
  var ensureAuth = function(req, res, next){
    if(!req.isAuthenticated()) {
      return next();
    }else {
      res.redirect("/student");
    }
  };

  module.exports = { loggedin, ensureAuth}
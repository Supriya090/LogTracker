var express = require("express");
var router = express.Router();
var User = require('../models/User')

module.exports = function(passport){
    //RN for Admin Signup but can be later used to create account for students and teacher
router.post('/signup', function (req, res) {
    var body = req.body,
        username = body.username,
        password = body.password;
  User.findOne({username: username}, function(err, doc){
     if(err) { res.status(500).send('error occured')}   //mongoose or database error
     else {
         if(doc){
             res.status(500).send('Username already exists')   //if user with same username already exist 
             }
         else{
             //Create new user
             var record = new User()
                 record.username = username;
                 record.password = record.hashPassword(password) //access method
                 record.save(function(err, user){    //Save to database
                     if(err){
                         res.status(500).send('database error !!!')
                     }else{
                         res.send(user)
                     }
                 })
            }
        }
    })
});

//For Login using local strategy
router.post('/login',passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/dashboard',
}),function(req,res){
    res.send('Welcome')
})
return router;
};

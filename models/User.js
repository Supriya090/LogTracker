var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');   //for encrypting password with hash

//Models
var UserSchema = new mongoose.Schema({
  // fullName: {
  //   type: String,
  //   required: true,
  // },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userstatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//Methods to encrypt and decrypt password
//synchronous function
UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function(password, hash){
  return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', UserSchema, 'users');

var mongoose = require('mongoose')


//Models
var CommentSchema = new mongoose.Schema({
  minuteId: {
    type: String,
    default: 'todo',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  comment: {
      type: String,
      required: true
  },
  commentedBy: {
      type: String,
      default: 'username'
    //   required: true
  }
})


var Comment = module.exports = mongoose.model('Comment', CommentSchema, 'comments')

module.exports.createComment = function (newComment, callback){
    newComment.save(callback)
}

module.exports.deleteComment = function (commentid, callback){
    Comment.deleteOne({ _id: commentid }, callback)
}

module.exports.getCommentsbyMid = function (mid,callback) {
    let query = { 
        minuteId:mid
        }
    Comment.find(query, callback)
  }

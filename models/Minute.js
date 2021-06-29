var mongoose = require('mongoose')


//Models
var minuteSchema = new mongoose.Schema({
  users: [{
    type: String,
    required: true,
  }],
  projectname: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedDate: {
      type: Date,
      default:Date.now(),
      required: true,
  },
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  createdBy: {
      type: String,
      required: true
  },
  updatedBy: {
      type:String,
      required: true
  }
})


var Minutes = module.exports = mongoose.model('Minute', minuteSchema)

module.exports.getMinutesbyId = function (uid,pid,callback) {
    let query = { 
        users: {$all : [uid]},
        projectname:pid
        }
    Minutes.find(query, callback)
  }

module.exports.updateMinutebyId = function (uid, pid, createdDate, newMinute, callback){
    let query = { 
        userId: uid,
        projectname:pid 
    }
    
        Minutes.find(query, function (err, m){
            if (err) throw err

            //minutes exist in database

            if(m.length > 0){
                Minutes.findOneAndUpdate(
                    {
                    userId: uid,
                    projectname: pid,
                    createdDate:createdDate},
                    {
                        $set: {
                            userId:uid,
                            projectname: pid,
                            createdDate: createdDate,
                            title: newMinute.title,
                            description: newMinute.description,
                            updatedBy: todo
                        }
                    },
                    {
                        new: true
                    },
                    callback
                )    
            }
            else
            {
                newMinute.save(callback)
            }
        })
}

module.exports.createMinute = function (newMinute, callback){
    newMinute.save(callback)
}
var mongoose = require('mongoose')


//Models
var EventSchema = new mongoose.Schema({
  projectId: {
    type: String,
    default: 'todo',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  event: {
      type: String,
      required: true
  },
  isCompleted: {
      type: Boolean,
      default: false,
      required: true
  },
  isCanceled: {
    type: Boolean,
    default: false,
    required: true
}
})


var Event = module.exports = mongoose.model('Event', EventSchema, 'events')

module.exports.createEvent = function (newEvent, callback){
    newEvent.save(callback)
}

module.exports.deleteEvent = function (eventid, callback){
    Event.deleteOne({ _id: eventid }, callback)
    
}
module.exports.Completed = function (eventId,callback) {
  let query = {
      _id: eventId
  }

  Event.find(query, function (err, e) {
      if (err) throw err

      //minutes exist in database

      if (e.length > 0) {
          Event.findOneAndUpdate(query, {
                  $set: {
                     isCompleted: true
                  }
              }, 
              {
                  new: true
              },
              callback
          )
      }
  })
}
module.exports.Remaining = function (eventId,callback) {
  let query = {
      _id: eventId
  }

  Event.find(query, function (err, e) {
      if (err) throw err

      //minutes exist in database

      if (e.length > 0) {
          Event.findOneAndUpdate(query, {
                  $set: {
                     isCompleted: false
                  }
              }, 
              {
                  new: true
              },
              callback
          )
      }
  })
}
module.exports.getEventsbyPid = function (pId,callback) {
    let query = { 
        projectId:pId
        }
    Event.find(query, callback)
  }

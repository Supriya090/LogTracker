var mongoose = require('mongoose')


//Models
var EventSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.ObjectId,
    default: 'todo',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdBy: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dueDate: {
    type: Date,
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

module.exports.getEventsbyPid = function (pId,callback) {
    let query = { 
        projectId:pId
        }
    Event.find(query, callback)
  }

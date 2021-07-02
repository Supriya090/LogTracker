var mongoose = require('mongoose')


//Models
var ProjectSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now(),
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
    semester: {
        type: String,
        required: true
    },
    members:{
        supervisor:String,
        team:[String]
    },
    events: [{
        title: String,
        status: String,
    }],
    createdBy: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
})


var Project = module.exports = mongoose.model('Project', ProjectSchema, 'projects')
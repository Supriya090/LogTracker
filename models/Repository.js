var mongoose = require('mongoose')


//Models
var FileSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
    },
    submittedDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    attachment: [{
        name: String,
        fileId: String,
        docs: {
            data: Buffer,
            contentType: String
        }
    }]
})


var File = module.exports = mongoose.model('File', FileSchema, 'files')
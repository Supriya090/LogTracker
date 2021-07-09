var mongoose = require('mongoose')


//Models
var MinuteSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    updatedDate: {
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
    attachment: [{
        name: String,
        fileId: String,
        docs: {
            data: Buffer,
            contentType: String
        }
    }],
    createdBy: {
        type: String,
          required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    updatedBy: {
        type: String,
    }
})


var Minute = module.exports = mongoose.model('Minute', MinuteSchema, 'minutes')

module.exports.getMinutesbyPid = function (pid, callback) {
    let query = {
        projectId: pid
    }
    Minute.find(query, callback)
}

module.exports.createMinute = function (newMinute, callback) {
    newMinute.save(callback)
}

module.exports.updateMinute = function (mId, newMinute, callback) {
    let query = {
        _id: mId
    }

    Minute.find(query, function (err, m) {
        if (err) throw err

        //minutes exist in database

        if (m.length > 0) {
            Minute.findOneAndUpdate(query, {
                $set: {
                    title: newMinute.title,
                    description: newMinute.description,
                    updatedBy: newMinute.updatedBy,
                    updatedDate:Date.now()
                }
            }, {
                new: true
            },
            callback
        )
        }
    })

 
    }

module.exports.verifyMinute = function (minuteId,callback) {
    let query = {
        _id: minuteId
    }

    Minute.find(query, function (err, m) {
        if (err) throw err

        //minutes exist in database

        if (m.length > 0) {
            Minute.findOneAndUpdate(query, {
                    $set: {
                       isVerified: true
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

module.exports.unVerifyMinute = function (minuteId,callback) {
    let query = {
        _id: minuteId
    }

    Minute.find(query, function (err, m) {
        if (err) throw err

        //minutes exist in database

        if (m.length > 0) {
            Minute.findOneAndUpdate(query, {
                    $set: {
                       isVerified: false
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
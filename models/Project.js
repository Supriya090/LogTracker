// var mongoose = require('mongoose')


// //Models
// var ProjectSchema = new mongoose.Schema({
//     createdDate: {
//         type: Date,
//         default: Date.now(),
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     semester: {
//         type: String,
//         required: true
//     },
//     members:{
//         supervisor:String,
//         team:[String]
//     },
//     events: [{
//         title: String,
//         status: String,
//     }],
//     createdBy: {
//         type: String,
//         required: true
//     },
//     isCompleted: {
//         type: Boolean,
//         default: false,
//         required: true
//     }
// })


// var Project = module.exports = mongoose.model('Project', ProjectSchema, 'projects')


// module.exports.getMinutesbyPid = function (pid, callback) {
//     let query = {
//         projectId: pid
//     }
//     Minute.find(query, callback)
// }

// module.exports.createMinute = function (newMinute, callback) {
//     newMinute.save(callback)
// }
// module.exports.updateMinutebyId = function (pid, minuteId, newMinute, callback) {
//     let query = {
//         projectname: pid
//     }

//     Minute.find(query, function (err, m) {
//         if (err) throw err

//         //minutes exist in database

//         if (m.length > 0) {
//             Minute.findOneAndUpdate({
//                     projectname: pid,
//                 }, {
//                     $set: {
//                         projectId: pid,
//                         title: newMinute.title,
//                         description: newMinute.description,
//                         updatedBy: todo
//                     }
//                 }, {
//                     new: true
//                 },
//                 callback
//             )
//         } else {
//             newMinute.save(callback)
//         }
//     })
// }

// module.exports.verifyMinute = function (pid, minuteId, newMinute, callback) {
//     let query = {
//         projectname: pid
//     }

//     Minute.find(query, function (err, m) {
//         if (err) throw err

//         //minutes exist in database

//         if (m.length > 0) {
//             Minute.findOneAndUpdate({
//                     projectname: pid,
//                 }, {
//                     $set: {
//                         projectId: pid,
//                         title: newMinute.title,
//                         description: newMinute.description,
//                         updatedBy: todo
//                     }
//                 }, {
//                     new: true
//                 },
//                 callback
//             )
//         } else {
//             newMinute.save(callback)
//         }
//     })
// }
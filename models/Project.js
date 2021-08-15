var mongoose = require("mongoose");

//Models
var ProjectSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  projectname: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  supervisor: {
    type: [String],
    required: true,
  },
  team: {
    type: [String],
    required: true,
  },

  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  midDefence: {
    requested: {
      type: Boolean,
      default: false,
      required: true,
    },
    message:String,
    approved: {
      type: Boolean,
      default: false,
      required: true,
    },
  
  },
  finalDefence: {
    requested: {
      type: Boolean,
      default: false,
      required: true,
    },
    message: String,
    approved: {
      type: Boolean,
      default: false,
      required: true,
    },
   
  },
  message: [{ comment: String, option: String, commentedBy: String }],
});

var Project = (module.exports = mongoose.model(
  "Project",
  ProjectSchema,
  "projects"
));

module.exports.createProject = function (newProject, callback) {
  newProject.save(callback);
};

module.exports.getProjectsbyUser = function (name, callback) {
  let query = {
    team: { $all: [name] },
  };
  Project.find(query, callback);
};

module.exports.getProjectsbySV = function (name, callback) {
  let query = {
    supervisor: name,
  };
  Project.find(query, callback);
};
module.exports.getProjectsbyCreator = function (name, callback) {
  let query = {
    createdBy: name,
  };
  Project.find(query, callback);
};

module.exports.getProjectsbyId = function (projectId, callback) {
  let query = {
    _id: projectId,
  };
  Project.find(query, callback);
};

module.exports.getProjectsbySemester = function (sem, callback) {
  let query = {
    semester: sem,
  };
  Project.find(query, callback);
};

module.exports.updateProject = function (projectId, newProject, callback) {
  Project.findByIdAndUpdate(
    projectId,
    {
      $set: {
        // description: newProject.description,
        // projectname =newproject.projectname,
        // description =  newproject.description,
        // supervisor = newproject.supervisor,
        // team =  newproject.team,
        // createdBy = newproject.createdBy,
        // semester = newproject.semester,
        // teamname =  newproject.teamname,
      },
    },
    {
      new: true,
    },
    callback
  );
};

module.exports.requestMidDefence = function (pid,message, callback) {
  Project.findByIdAndUpdate(
    pid,

    {
      $set: {
        "midDefence.requested": true,
        "midDefence.message": message,
      },
    },
    {
      new: true,
    },
    callback
  );
};

module.exports.requestFinalDefence = function (pid,message, callback) {
  Project.findByIdAndUpdate(
    pid,
    {
      $set: {
        "finalDefence.requested": true,
        "finalDefence.message": message,
      },
    },
    {
      new: true,
    },
    callback
  );
};

module.exports.approveMidDefence = function (pid, callback) {
  Project.findByIdAndUpdate(
    pid,

    {
      $set: {
        "midDefence.approved": true,
      },
    },
    {
      new: true,
    },
    callback
  );
};

module.exports.approveFinalDefence = function (pid, callback) {
  Project.findByIdAndUpdate(
    pid,
    {
      $set: {
        "finalDefence.approved": true,
      },
    },
    {
      new: true,
    },
    callback
  );
};

module.exports.comment = function (pid, ncomment, callback) {
  Project.updateOne(
    { _id: pid },
    {
      $push: {
        message: ncomment,
      },
      done,
      callback,
    }
  );
};

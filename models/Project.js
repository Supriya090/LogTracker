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
  description: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  team: [
    {
      type: String,
    }
  ],
  createdBy: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

var Project = (module.exports = mongoose.model(
  "Project",
  ProjectSchema,
  "projects"
));

module.exports.createProject = function (newProject, callback) {
  newProject.save(callback);
};

module.exports.getProjectsbyUser = function (userId, callback) {
  let query = {
    projectId: pid,
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

module.exports.updateProjectbyId = function (projectId, newProject, callback) {
  let query = {
    _id: projectId,
  };

  Project.find(query, function (err, m) {
    if (err) throw err;

    //minutes exist in database

    if (m.length > 0) {
      Project.findOneAndUpdate(
        {
          projectname: pid,
        },
        {
          $set: {
            projectId: pid,
            title: newMinute.title,
            description: newMinute.description,
            updatedBy: todo,
          },
        },
        {
          new: true,
        },
        callback
      );
    }
  });
};

module.exports.verifyMinute = function (pid, minuteId, newMinute, callback) {
  let query = {
    projectname: pid,
  };

  Project.find(query, function (err, m) {
    if (err) throw err;

    //minutes exist in database

    if (m.length > 0) {
      Project.findOneAndUpdate(
        {
          projectname: pid,
        },
        {
          $set: {
            projectId: pid,
            title: newMinute.title,
            description: newMinute.description,
            updatedBy: todo,
          },
        },
        {
          new: true,
        },
        callback
      );
    } else {
      newMinute.save(callback);
    }
  });
};

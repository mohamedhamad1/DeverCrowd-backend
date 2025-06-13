const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  time_to_finish: {
    type: Date,
    required: true,
  },
  sponser: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  projectid: {
    type: Number,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Project", projectSchema, "projects");

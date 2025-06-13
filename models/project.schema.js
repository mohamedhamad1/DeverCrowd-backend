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
  timetofinish: {
    type: String,
    required: true,
  },
  sponser: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Project", projectSchema, "projects");

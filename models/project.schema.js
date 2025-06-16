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
  client: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in progress", "review", "completed"],
    default: "pending",
  },
  cost: {
    type: Number,
    required: true,
    default:0,
  },
  timespend: {
    type: String,
    required: true,
    default:0,
  },
  category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Project", projectSchema, "projects");

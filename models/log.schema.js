const mongoose = require("mongoose");
const logSchema = mongoose.Schema(
  {
    taskname: {
      type: String,
      required: true,
    },
    taskdescription: {
      type: String,
      required: true,
    },
    taskdate: {
      type: Date,
      required: true,
    },
    taskcategory: {
      type: String,
      required: true,
    },
    workedhours: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Done", "InProgress"],
      default: "InProgress",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Log", logSchema, "logs");

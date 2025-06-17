const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedto: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    type: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "review", "completed"],
      default: "pending",
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema, "tasks");

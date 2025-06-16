const mongoose = require("mongoose");
const roles = require("../utils/adminRoles");
const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(roles),
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tasksnumber: {
    type: String,
    required: true,
    default: 0,
  },
  tasksdone: {
    type: String,
    required: true,
    default: 0,
  },
});

adminSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignedto",
});

adminSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "userid",
});

adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Admin", adminSchema, "admins");

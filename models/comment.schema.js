const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    commenttext: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");

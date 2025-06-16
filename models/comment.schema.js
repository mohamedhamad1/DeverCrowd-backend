const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  commentText: {
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
  createdat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");

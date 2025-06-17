const JWThandler = require("../utils/JWThandler");
const errorHandler = require("../utils/errorHandler");
const Task = require("../models/task.schema");
const Message = require("../models/message.schema");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const httpResponse = require("../utils/httpResponse");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Admin = require("../models/admin.schema");
const Comment = require("../models/comment.schema");
const moment = require("moment");
//test
const getAllProfiles = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 100;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const admins = await Admin.find()
    .limit(limit)
    .skip(skip)
    .select("-password -token -_v")
    .populate([
      {
        path: "tasks",
        select: "title type deadline",
      },
      {
        path: "comments",
        select: "username userid commenttext",
      },
    ]);
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getAllUsers,
    data: { admins },
  });
});

const getSingleProfile = asyncWrapper(async (req, res, next) => {
  const id = req.params.id || req.user.id;

  const user = await Admin.findById(id)
    .select("-password -token -_v")
    .populate([
      {
        path: "tasks",
        select: "title description type deadline status references",
      },
      {
        path: "comments",
        select: "username userid commenttext",
      },
    ]);

  if (!user) {
    return next(
      errorHandler.create(
        httpResponse.status.notfound,
        httpResponse.message.userNotFound
      )
    );
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getSingleUser,
    data: {
      user,
    },
  });
});

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = limit * (page - 1);
  const tasks = await Task.find().limit(limit).skip(skip);
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getAllTasks,
    data: { tasks },
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const { title, description, deadline, assignedto, status, references, type } =
    req.body;
    console.log(req.body);
    
  const newtask = await Task.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      deadline,
      assignedto,
      status,
      references,
      type
    },
    { new: true }
  );
  if (!newtask) {
    const error = errorHandler.create(
      httpResponse.message.taskNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.updateTask,
    data: { newtask },
  });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { title, description, deadline, assignedto, status, references, type } =
    req.body;
  const newtask = new Task({
    title,
    description,
    deadline,
    assignedto,
    status,
    references,
    type,
  });

  await newtask.save();

//=============== Promise is a honey but not the best type ;) ===================
  await Admin.updateMany(
    { _id: { $in: assignedto } },
    { $inc: { tasksnumber: 1 } }
  );
//===============================================================================

  res.json({
    status: httpResponse.status.created,
    message: httpResponse.message.createTask,
    data: { newtask },
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findById(id)
 
  if (!task) {
    const error = errorHandler.create(
      httpResponse.message.taskNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  const assignedto = task.assignedto
  await Task.deleteOne({ _id: id });

  await Admin.updateMany(
    { _id: { $in: assignedto } },
    { $inc: { tasksnumber: -1 } }
  );
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteTask,
  });
});

const getAllComments = asyncWrapper(async (req, res, next) => {
  const comments = await Comment.find({ userid: req.user.id }).sort({
    createdat: 1,
  });
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getComments,
    data: { comments },
  });
});

const postComment = asyncWrapper(async (req, res, next) => {
  const { commenttext, userid } = req.body;
  if (userid != req.user.id) {
    const error = errorHandler.create(
      httpResponse.message.unauthorized,
      httpResponse.status.unauthorized
    );
    return next(error);
  }
  const newComment = Comment({
    commenttext,
    userid: req.user.id,
    username: req.user.username,
  });
  await newComment.save();
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.createComment,
    data: { newComment },
  });
});

const deleteComment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedcomment = await Comment.findByIdAndDelete({ _id: id });
  if (!deletedcomment) {
    const error = errorHandler.create(
      httpResponse.message.commentNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteComment,
  });
});

module.exports = {
  getAllProfiles,
  getSingleProfile,
  getAllTasks,
  updateTask,
  createTask,
  deleteTask,
  getAllComments,
  postComment,
  deleteComment,
};

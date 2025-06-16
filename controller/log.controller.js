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

const getAllProfiles = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 100;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const admins = await Admin.find()
    .limit(limit)
    .skip(skip)
    .select("username role nickname tasksnumber tasksdone tasks")
    .populate({
      path: 'tasks',
      select: "title type deadline"
    });
  console.log(admins);
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getAllUsers,
    data: { admins },
  });
});

const getSingleProfile = asyncWrapper(async (req, res, next) => {
  const id = req.params.id || req.user.id;

  const user = await Admin.findById(id)
    .select("username role nickname")
    .populate({
      path: "tasks",
      select: "title description type deadline status references",
    });

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
      username: user.username,
      role: user.role,
      nickname: user.nickname,
      tasks: user.tasks,
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
  const { title, description, deadline, assignedTo, status, references, type } =

    req.body;
  const newtask = await Task.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      deadline,
      assignedto,
      status,
      references,
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
  res.json({
    status: httpResponse.status.created,
    message: httpResponse.message.createTask,
    data: { newtask },
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedtask = await Task.findByIdAndDelete({ _id: id });
  if (!deletedtask) {
    const error = errorHandler.create(
      httpResponse.message.taskNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteTask,
  });
});

const getAllComments = asyncWrapper(async (req, res, next) => {
  const comments = await Comment.find().sort({ createdat: 1 });
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getComments,
    data: { comments },
  });
});

const postComment = asyncWrapper(async (req, res, next) => {
  const { commenttext } = req.body;
  const newComment = Comment({
    commenttext,
    userid: req.user.id,
    username: req.user.username,
    createdat: moment(Date.now()).format("DD MM YYYY hh:mm"),
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
  const comment = await Comment.findById(id);
  if (!comment) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.commentNotFound
    );
    return next(error);
  }
  await Comment.deleteOne({ _id: id });
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteComment,
    data: null,
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

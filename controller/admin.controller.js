const JWThandler = require("../utils/JWThandler");
const errorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin.schema");
const Message = require("../models/message.schema");
const Log = require("../models/log.schema");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");

const Login = async (req, res) => {
  //swilam

  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    res.json({
      status: 400,
      message: httpStatus.MESSAGE.invalidCredentials,
      data: {},
    });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    res.json({
      status: 400,
      message: httpStatus.MESSAGE.invalidCredentials,
      data: {},
    });
  }
  const token = await JWThandler.generateJWT({
    username: user.username,
    role: user.role,
    id: user._id,
  });
  res.json({
    status: 200,
    message: httpStatus.MESSAGE.loginSuccess,
    data: { token },
  });
};

const register = async (req, res) => {
  //swilam

  const { username, password, role, nickname } = req.body;
  const admin = await Admin.findOne({ username: username });
  if (admin) {
    const error = errorHandler.create(
      httpStatus.MESSAGE.userExist,
      400,
      httpStatus.STATUS.fail
    );
    res.json({ status: 400, message: httpStatus.MESSAGE.userExist, data: {} });
  }
  const passwordHashing = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({
    username,
    nickname,
    password: passwordHashing,
    role,
  });
  const token = await JWThandler.generateJWT({
    username: newAdmin.username,
    role: newAdmin.role,
  });
  newAdmin.token = token;
  await newAdmin.save();
  res.json({
    status: 201,
    message: "Register successful",
    data: { user: newAdmin },
  });
};

const Logout = async (req, res) => {
  //swilam

  const token = req.headers.authorization;
  if (!token) {
    res.json({
      status: 400,
      message: httpStatus.MESSAGE.tokenRequired,
      data: {},
    });
  }

  await JWThandler.blacklistJWT(token);
  res.json({ status: 200, message: httpStatus.MESSAGE.logoutSuccess });
};

const authtest = async (req, res) => {
  //swilam
  const token = req.headers.authorization;
  res.json({ token });
};

const GetMessages = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const messages = await Message.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Messages paginated", data: { messages } });
};

const DelMessages = async (req, res) => {
  //swilam
  const { id } = req.params;

  const message = await Message.findOne({ _id: id });
  if (!message) {
    return res.json({
      status: 400,
      message: httpStatus.MESSAGE.messageNotExist,
    });
  }
  const data = await Message.deleteOne({ _id: id });
  res.json({ status: 200, message: httpStatus.MESSAGE.messageDeleted });
};

const GetLogs = async (req, res) => {
  //swilam
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const logs = await Log.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Projects paginated", data: { logs } });
};

const CreateLogs = async (req, res) => {
  //swilam
  const { taskname, taskdescription, workedhours, status, victim } = req.body;
  const newLog = new Log({
    taskname,
    taskdescription,
    workedhours,
    status,
    victim,
    taskdate: new Date(),
  });
  await newLog.save();
  res.json({ status: 200, message: "Done" });
};

const UpdateLogs = async (req, res) => {
  //braa
  const id = req.params.id;
  const { taskname, description, workedhours, status, victim } = req.body;
  const newlog = await Log.findOneAndUpdate(
    { _id: id },
    {
      taskname,
      description,
      workedhours,
      victim,
      status,
    },
    { new: true }
  );
  res.json({ staus: 200, message: "updated successfully", data: { newlog } });
};

const DelLogs = async (req, res) => {
  //braa
  const id = req.params.id;
  await Log.findByIdAndDelete(id);
  return res.json({ status: 200, message: "Log deleted successfully" });
};

const GetSingleLog = async (req, res) => {
  //braa
  const { id } = req.params;
  const log = await Log.findOne({ _id: id });
  res.json({ status: 200, message: "Project Details", data: { log } });
};

module.exports = {
  Login,
  Logout,
  GetMessages,
  DelMessages,
  GetLogs,
  CreateLogs,
  UpdateLogs,
  DelLogs,
  register,
  authtest,
  GetSingleLog,
};

const JWThandler = require("../utils/JWThandler");
const errorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin.schema");
const Message = require("../models/message.schema");
const Log = require("../models/log.schema");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const httpResponse = require("../utils/httpResponse");
const asyncWrapper = require('../middlewares/asyncWrapper')

const Login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    const error = errorHandler.create(httpResponse.message.invalidCredentials, httpResponse.status.notfound)
    return next(error)
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = errorHandler.create(httpResponse.message.invalidCredentials, httpResponse.status.notfound)
    return next(error)
  }
  const token = await JWThandler.generateJWT({
    username: user.username,
    role: user.role,
    id: user._id,
  });
  res.json({
    status: 200,
    message: httpResponse.message.loginSuccess,
    data: { token },
  });
})

const register = asyncWrapper(async (req, res, next) => {
  const { username, password, role, nickname } = req.body;
  const admin = await Admin.findOne({ username: username });
  if (admin) {
    const error = errorHandler.create(httpResponse.message.userExist, httpResponse.status.fail);
    return next(error)
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
})

const Logout = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = errorHandler.create(httpResponse.message.invalidToken, httpResponse.status.badrequest)
  }
  await JWThandler.blacklistJWT(token);
  res.json({ status: 200, message: httpResponse.message.logoutSuccess });
});

const authtest = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  res.json({ token });
});

const GetMessages = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const messages = await Message.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Messages paginated", data: { messages } });
});

const DelMessages = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findOne({ _id: id });
  if (!message) {
    const error = errorHandler.create(httpResponse.message.messageNotFound, httpResponse.status.fail);
    return next(error)
  }
  const data = await Message.deleteOne({ _id: id });
  res.json({ status: 200, message: httpResponse.message.messageDeleted });
});

const GetLogs = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const logs = await Log.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Logs paginated", data: { logs } });
});

const CreateLogs = asyncWrapper(async (req, res, next) => {
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
});

const UpdateLogs = asyncWrapper(async (req, res, next) => {
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
});

const DelLogs = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedLog = await Log.findByIdAndDelete({_id:id});
  if(!deletedLog){
    const error = errorHandler.create(httpResponse.message.notfound, httpResponse.status.fail);
    return next(error)
  }
  res.json({ status: 200, message: "Log deleted successfully" });
});

const GetSingleLog = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const log = await Log.findOne({ _id: id });
  if(!log){
    const error = errorHandler.create(httpResponse.message.notfound, httpResponse.status.fail);
    return next(error)
  }
  res.json({ status: 200, message: "Log Details", data: { log } });
});

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

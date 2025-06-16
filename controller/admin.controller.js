const JWThandler = require("../utils/JWThandler");
const errorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin.schema");
const Message = require("../models/message.schema");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const httpResponse = require("../utils/httpResponse");
const asyncWrapper = require("../middlewares/asyncWrapper");

const Login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    const error = errorHandler.create(
      httpResponse.message.invalidCredentials,
      httpResponse.status.unauthorized
    );
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = errorHandler.create(
      httpResponse.message.invalidCredentials,
      httpResponse.status.unauthorized
    );
    return next(error);
  }
  const token = await JWThandler.generateJWT({
    username: user.username,
    role: user.role,
    id: user._id,
  });
  res.json({
    status: httpResponse.message.ok,
    message: httpResponse.message.loginSuccess,
    data: { token },
  });
  
});

const register = asyncWrapper(async (req, res, next) => {
  const { username, password, role, nickname } = req.body;
  const admin = await Admin.findOne({ username: username });
  if (admin) {
    const error = errorHandler.create(
      httpResponse.message.userExist,
      httpResponse.status.Conflict
    );
    return next(error);
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
    status: httpResponse.status.created,
    message: httpResponse.message.accountCreated,
    data: null,
  });
});

const Logout = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = errorHandler.create(
      httpResponse.message.invalidToken,
      httpResponse.status.badrequest
    );
  }
  await JWThandler.blacklistJWT(token);
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.logoutSuccess,
  });
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
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getMessages,
    data: { messages },
  });
});

const DelMessages = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findOne({ _id: id });
  if (!message) {
    const error = errorHandler.create(
      httpResponse.message.messageNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  const data = await Message.deleteOne({ _id: id });
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteMessage,
  });
});



module.exports = {
  Login,
  Logout,
  GetMessages,
  DelMessages,
  register,
  authtest,
};

const JWThandler = require("../utils/JWThandler");
const errorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin.schema");
const Message = require("../models/message.schema")
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");

const Login = async (req, res) => {  //swilam

  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    res.json({
      status: 400,
      message: httpStatus.DATA.invalidCredentials,
      data: {},
    });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    res.json({
      status: 400,
      message: httpStatus.DATA.invalidCredentials,
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
    message: httpStatus.DATA.loginSuccess,
    data: { token },
  });
};

const register = async (req, res) => {  //swilam


  const { username, password, role, nickname } = req.body;
  const admin = await Admin.findOne({ username: username });
  if (admin) {
    const error = errorHandler.create(
      httpStatus.DATA.userExist,
      400,
      httpStatus.STATUS.fail
    );
    res.json({ status: 400, message: httpStatus.DATA.userExist, data: {} });
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

const Logout = async (req, res) => {  //swilam

  const token = req.headers.authorization;
  if (!token) {
    res.json({ status: 400, message: httpStatus.DATA.tokenRequired, data: {} });
  }
  
  await JWThandler.blacklistJWT(token);
  res.json({ status: 200, message: httpStatus.DATA.logoutSuccess });
};

const authtest = async (req, res) => { //swilam
  const token = req.headers.authorization
  res.json({token})

};

const GetMessages = async (req, res) => {
  const limit = req.query.limit || 10
  const page = req.query.page || 1
  const skip = limit * (page - 1)
  const messages = await Message.find().limit(limit).skip(skip)
  res.json({status: 200, message:"Messages paginated", data:{messages}})
};

const DelMessages = async (req, res) => {  //swilam
  const {id} = req.params
  
  const message = await Message.findOne({_id:id})
  if(!message){
    return res.json({status:400, message:httpStatus.DATA.messageNotExist}) 
  }
  const data = await Message.deleteOne({_id:id})
  res.json({status:200, message:httpStatus.DATA.messageDeleted})
};

const GetLogs = async (req, res) => {  //braa

  res.json({ data: "test" });
};

const CreateLogs = async (req, res) => {  //braa

  res.json({ data: "test" });
};

const UpdateLogs = async (req, res) => {  //braa

  res.json({ data: "test" });
};

const DelLogs = async (req, res) => {  //braa

  res.json({ data: "test" });
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
  authtest
};

const generateJWT = require('../utils/generateJWT');
const errorHandler = require('../utils/errorHandler')
const Admin = require('../models/admin.schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const httpStatus = require('../utils/httpStatus')


const Login = async (req, res) => { //swilam
  try {
    const {username, password} = req.body
    const user = await Admin.findOne({username})
    if(!user){
      res.json({status:400, message:httpStatus.DATA.invalidCredentials, data:{}})
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if(!matchedPassword){
      res.json({status:400, message:httpStatus.DATA.invalidCredentials, data:{}})
    }
    const token = await generateJWT({username: user.username, role:user.role, id:user._id})
    res.json({status:200, message:httpStatus.DATA.loginSuccess, data:{token}})
  } catch (error) {
      console.log(error);
  }
};

const register = async (req, res) => { //swilam
  try {
    const {username, password, role, nickname} = req.body
    const admin = await Admin.findOne({username:username})
    if(admin){
      const error = errorHandler.create(httpStatus.DATA.userExist, 400, httpStatus.STATUS.fail)
      res.json({status:400, message:httpStatus.DATA.userExist, data:{}})
    }
    const passwordHashing = await bcrypt.hash(password, 10)
    const newAdmin = new Admin({
      username,
      nickname,
      password: passwordHashing,
      role
    })
    const token = await generateJWT({username: newAdmin.username, role:newAdmin.role})
    newAdmin.token = token
    await newAdmin.save()
    res.json({status: 201,message: "Register successful",data: {user: newAdmin}})

  } catch (error) {
    console.log(error);
  }
};

const Logout = async (req, res) => { //swilam
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
      res.json({status:400, message:httpStatus.DATA.tokenRequired, data:{}})
    }
  } catch (error) {
    console.log(error);
  }
};

const GetMessages = async (req, res) => { //swilam
  res.json({ data: "test" });
};

const DelMessages = async (req, res) => { //swilam
  res.json({ data: "test" });
};

const GetLogs = async (req, res) => { //braa 
  res.json({ data: "test" });
};

const CreateLogs = async (req, res) => { //braa
  res.json({ data: "test" });
};

const UpdateLogs = async (req, res) => { //braa
  res.json({ data: "test" });
};

const DelLogs = async (req, res) => { //braa
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
  register
};

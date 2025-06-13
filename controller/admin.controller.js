const generateJWT = require('../middlewares/generateJWT');
const Admin = require('../models/admin.schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Login = async (req, res) => { //swilam
  try {
    res.json({ data: "test" });
  } catch (error) {
    
  }
};

const register = async (req, res) => { //swilam
  try {
    const {username, password, role, nickname} = req.body
    const admin = await Admin.findOne({username:username})

  } catch (error) {
    
  }
};

const Logout = async (req, res) => { //swilam
  res.json({ data: "test" });
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

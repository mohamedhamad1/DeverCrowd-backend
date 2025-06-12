const projectController = require("../controller/project.controller");
const express = require("express")
const router = express.Router();
const { check } = require('express-validator')


router.route("/")
    .get(async(req,res)=>{res.json({data:"test"})})
    .post(async(req,res)=>{res.json({data:"test"})})
    .put(async(req,res)=>{res.json({data:"test"})})
    .delete(async(req,res)=>{res.json({data:"test"})})

module.exports = router
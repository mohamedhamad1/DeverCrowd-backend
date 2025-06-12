const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const adminController = require("../controller/admin.controller");
const projectController = require("../controller/project.controller");


router.route("/login")
    .post(async(req,res)=>{res.json({data:"test"})})

router.route("/logout")
    .get(async(req,res)=>{res.json({data:"test"})})

router.route("/messages")
    .get(async(req,res)=>{res.json({data:"test"})})

router.route("/logs")
    .get(async(req,res)=>{res.json({data:"test"})})


module.exports = router
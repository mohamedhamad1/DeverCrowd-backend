const contactController = require("../controller/contact.controller");
const express = require("express");
const router = express.Router();
const { check } = require('express-validator')


router.route("/")
    .post(async(req,res)=>{res.json({data:"test"})})

module.exports = router
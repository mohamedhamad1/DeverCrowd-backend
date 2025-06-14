const contactController = require("../controller/message.controller");
const express = require("express")
const router = express.Router();
const auth = require("../middlewares/auth");

const { check } = require('express-validator')


router.route("/")
    .post(contactController.sendForm);

module.exports = router
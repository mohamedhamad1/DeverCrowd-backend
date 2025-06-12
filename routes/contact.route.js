const contactController = require("../controller/contact.controller");
const express = require("express")
const router = express.Router();
const { check } = require('express-validator')


router.route("/")
    .post(contactController.sendForm);

module.exports = router
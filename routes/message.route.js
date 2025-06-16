const contactController = require("../controller/message.controller");
const express = require("express")
const router = express.Router();
const auth = require("../middlewares/auth");
const validator = require('../utils/validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')

const { check } = require('express-validator')


router.route("/")
    .post(contactController.sendForm);

module.exports = router
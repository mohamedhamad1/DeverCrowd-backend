const contactController = require("../controller/contact.controller");
const express = require("express");

const router = express.Router();

router.route("/").post(contactController.submitForm);

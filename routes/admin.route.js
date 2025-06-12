const adminController = require("../controller/admin.controller");
const express = require("express");
const router = express.Router();

router.route("/login")
    .post(adminController.login)

router.route("/logout")
    .get(adminController.logout)

router.route("/messages")
    .get(adminController.messages)

router.route("/logs")
    .get(adminController.logs)


module.exports = router
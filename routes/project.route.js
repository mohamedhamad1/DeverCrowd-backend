const adminController = require("../controller/admin.controller");

const express = require("express");

const router = express.Router();

router.route("/").delete(adminController.displayProjects);

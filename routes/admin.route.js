const adminController = require("../controller/admin.controller");
const express = require("express");

const router = express.Router();

router.route("/login").post(adminController.login);

router.route("/logout").post(adminController.logout);

router.route("/messages").get(adminController.messages);

router.route("/logs").get(adminController.logs);

router.route("/projects").get(adminController.displayProjects);

router.route("/projects").post(adminController.createProject);

router.route("/projects").put(adminController.editProject);

router.route("/projects").delete(adminController.deleteProject);

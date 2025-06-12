const projectController = require("../controller/project.controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(projectController.displayProjects)
    .post(projectController.createProject)
    .put(projectController.editProject)
    .delete(projectController.deleteProject)

module.exports = router
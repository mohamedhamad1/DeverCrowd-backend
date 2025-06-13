const projectController = require("../controller/project.controller");
const express = require("express")
const router = express.Router();
const { check } = require('express-validator')


router.route("/")
    .get(projectController.getProjects)
    .post(projectController.createProject)
    
    router.route("/:id")
    .get(projectController.singleProject)
    .put(projectController.updateProject)
    .delete(projectController.delProject)

module.exports = router
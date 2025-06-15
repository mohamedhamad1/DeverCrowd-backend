const projectController = require("../controller/project.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const roles = require('../utils/adminRoles')


const { check } = require("express-validator");

router
  .route("/")
  .get(projectController.getProjects)
  .post(auth.verifyToken,auth.allowedTo(roles.ceo,roles.backend), projectController.createProject);

router
  .route("/:id")
  .get(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.singleProject)
  .put(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.updateProject)
  .delete(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.delProject);

module.exports = router;

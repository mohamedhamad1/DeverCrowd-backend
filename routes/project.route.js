const projectController = require("../controller/project.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const roles = require('../utils/roles')
const validator = require('../utils/validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')



const { check } = require("express-validator");

router
  .route("/")
  .get(auth.isauth ,projectController.getProjects)
  .post(auth.verifyToken, projectController.createProject);

router
  .route("/:id")
  .get(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.singleProject)
  .put(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.updateProject)
  .delete(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), projectController.delProject);

module.exports = router;

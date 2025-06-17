const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const logController = require("../controller/log.controller");
const roles = require("../utils/roles");
const validator = require('../utils/validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')

router.route("/profiles")
  .get(
    auth.verifyToken,
    auth.allowedTo(roles.ceo, roles.cto),
    logController.getAllProfiles
  );

router.route("/profiles/:id")
  .get(auth.verifyToken, logController.getSingleProfile);


router.route("/tasks")
  .get(auth.verifyToken,logController.getAllTasks)
  .post(auth.verifyToken,logController.createTask);

router.route("/tasks/:id")
  .put(auth.verifyToken,logController.updateTask)
  .delete(auth.verifyToken,logController.deleteTask);

router.route("/comments")
  .get(auth.verifyToken,logController.getAllComments)
  .post(auth.verifyToken, logController.postComment);

router.route("/comments/:id")
  .delete(auth.verifyToken, logController.deleteComment);

module.exports = router;
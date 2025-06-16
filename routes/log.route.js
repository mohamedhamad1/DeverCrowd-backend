const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const logController = require("../controller/log.controller");
const roles = require("../utils/adminRoles");

router.route("/profiles").get(logController.getAllProfiles);

router.route("/profiles/:id").get(logController.getSingleProfile);

router
  .route("/tasks")
  .get(logController.getAllTasks)
  .post(logController.createTask);

router
  .route("/tasks/:id")
  .put(logController.updateTask)
  .delete(logController.deleteTask);

router
  .route("/comments")
  .get(logController.getAllComments)
  .post(auth.verifyToken, logController.postComment);

router.route("/comments/:id").delete(logController.deleteComment);

module.exports = router;

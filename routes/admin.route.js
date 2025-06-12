const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const adminController = require("../controller/admin.controller");

router.route("/login").post(adminController.Login);
router.route("/logout").get(adminController.Logout);

router
  .route("/message")
  .get(adminController.GetMessages)
  .delete(adminController.DelMessages);

router
  .route("/log")
  .get(adminController.GetLogs)
  .post(adminController.CreateLogs)
  .delete(adminController.DelLogs)
  .put(adminController.UpdateLogs);

module.exports = router;

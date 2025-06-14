const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const adminController = require("../controller/admin.controller");

router.route("/authtest").get(auth.verifyToken, adminController.authtest);

router.route("/login").post(adminController.Login);

router.route("/register").post(adminController.register);

router.route("/logout").post(adminController.Logout);

router.route("/message/:id").delete(adminController.DelMessages);

router.route("/message").get(adminController.GetMessages);

router
  .route("/log")
  .get(adminController.GetLogs)
  .post(adminController.CreateLogs);
router
  .route("/log/:id")
  .get(adminController.GetSingleLog)
  .delete(adminController.DelLogs)
  .put(adminController.UpdateLogs);

module.exports = router;

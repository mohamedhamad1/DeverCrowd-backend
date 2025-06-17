const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const adminController = require("../controller/admin.controller");
const roles = require('../utils/roles')
const validator = require('../utils/validator')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const rateLimit = require('../middlewares/rateLimit')

router.route("/authtest").get(auth.verifyToken,adminController.authtest);

router.route("/login").post(rateLimit.formRateLimiter, adminController.Login);

router.route("/register").post(auth.verifyToken,auth.allowedTo(roles.ceo,roles.cto), adminController.register);

router.route("/logout").post(auth.verifyToken, adminController.Logout);

router.route("/message").get(auth.verifyToken, adminController.GetMessages);

router.route("/message/:id").delete(auth.verifyToken, auth.allowedTo(roles.ceo,roles.cto), adminController.DelMessages);


module.exports = router;

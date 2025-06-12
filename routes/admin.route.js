const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const adminController = require("../controller/admin.controller");

router.route("/login").post(async (req, res) => {
  res.json({ data: "test" });
});

router.route("/logout").get(async (req, res) => {
  res.json({ data: "test" });
});

router
  .route("/message")
  .get(async (req, res) => {
    res.json({ data: "test" });
  })
  .delete(async (req, res) => {
    res.json({ data: "test" });
  });

router
  .route("/log")
  .get(async (req, res) => {
    res.json({ data: "test" });
  })
  .post(async (req, res) => {
    res.json({ data: "test" });
  })
  .delete(async (req, res) => {
    res.json({ data: "test" });
  })
  .put(async (req, res) => {
    res.json({ data: "test" });
  });

module.exports = router;

//====================Libs==============
require('dotenv').config();
const express = require("express");
const adminRoutes = require("./routes/admin.route");
const projectRoutes = require("./routes/project.route");
const contactRoutes = require("./routes/contact.route");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dbconnect = require('./config/database');


//===================server===================
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/admin/contact", contactRoutes);

app.use((req, res, next) => {
  res.status(404).json({ status: "fail", data: "Page Not Found" });
});



app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}/`);
});
//bla bla
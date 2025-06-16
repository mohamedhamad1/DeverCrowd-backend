//====================Libs==============
require("dotenv").config();
const express = require("express");
const adminRoutes = require("./routes/admin.route");
const projectRoutes = require("./routes/project.route");
const contactRoutes = require("./routes/message.route");
const logRoutes = require("./routes/log.route");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbconnect = require("./config/database");
const httpResponse = require('./utils/httpResponse')
 
//===================server===================
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/admin/log", logRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/contact", contactRoutes);

app.use((req, res, next) => {
  res.status(404).json({ status: "fail", data: "Page Not Found" });
});

app.use((err, req, res, next)=>{
  // console.log(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ status: httpResponse.status.badrequest, message: httpResponse.message.invalidjsonformat, data: null });
  }
  res.status(err.statusCode || 500).json({message: err.message, status: err.statusCode || 500, data: null})
})

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}/`);
});


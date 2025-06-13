//====================Libs==============
const express = require("express");
const adminRoutes = require("./routes/admin.route");
const projectRoutes = require("./routes/project.route");
const contactRoutes = require("./routes/contact.route");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');





//============DB connection ===================


mongoose
  .connect("mongodb+srv://devercrowd:bEXgF81qnULubpTu@cluster0.2pheten.mongodb.net/")
  .then(() => {
    console.log("Mongodb server connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

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



app.listen(3001, () => {
  console.log(`server running on http://localhost:3001/`);
});

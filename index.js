//====================Libs==============
const express = require('express')
const adminRoutes = require("./routes/admin.route")
const cors = require("cors");
const session = require('express-session')
const passport = require("passport");
const bodyParser = require('body-parser')
//====================================

//===================server===================
const app = express()

app.use('/api/admin', adminRoutes)

app.all("*", (req, res, next) => {
  res.status(404).json({ status: "fail", data: "Page Not Found" });
});

app.listen(3001,()=>{
    console.log(`server running on http://localhost:3001/`);
})
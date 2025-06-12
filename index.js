const express = require("express");
const adminRouter = require("./routers/admin.route");
const contactRouter = require("./routers/contact.route");
const projectRouter = require("./routers/project.route");
const app = express();

app.route("api/admin", adminRouter);
app.route("api/contact", contactRouter);
app.route("api/projects", projectRouter);

app.listen(3001, () => {
  console.log(`server running on http://localhost:3001/`);
});

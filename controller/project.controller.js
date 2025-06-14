const Project = require("../models/project.schema");
const httpResponse = require("../utils/httpResponse");
const errorHandler = require("../utils/errorHandler");
const asyncWrapper = require('../middlewares/asyncWrapper')

const getProjects = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const projects = await Project.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Projects paginated", data: { projects } });
});

const singleProject = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if(!project){
    const error = errorHandler.create(httpResponse.message.projectNotFound, httpResponse.status.fail);
    return next(error)
  }
  res.json({ status: 200, message: "Project Details", data: { project } });
});

const createProject = asyncWrapper(async (req, res, next) => {
  const { title, description, timetofinish, sponser, status, pic } = req.body;
  const newProject = new Project({
    title,
    description,
    timetofinish,
    sponser,
    status,
    pic,
  });
  await newProject.save();
  res.json({
    status: 201,
    message: httpResponse.message.projectCreated,
    data: { newProject },
  });
});

const updateProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id; 
  const { title, description, pic, timetofinish, sponser, status } = req.body;
  const newproject = await Project.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      pic,
      timetofinish,
      sponser,
      status,
    },
    { new: true }
  );
  if(!newproject){
    const error = errorHandler.create(httpResponse.message.projectNotFound, httpResponse.status.fail);
    return next(error)
  }
  res.json({
    staus: 200,
    message: "updated successfully",
    data: { newproject },
  });
});

const delProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedproject = await Project.findByIdAndDelete({_id:id});
  if(!deletedproject){
    const error = errorHandler.create(httpResponse.message.projectNotFound, httpResponse.status.fail);
    return next(error)
  }
  res.json({ status: 200, message: "Project deleted successfully" });
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
  singleProject,
};

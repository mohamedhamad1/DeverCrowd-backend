const Project = require("../models/project.schema");
const httpResponse = require("../utils/httpResponse");
const errorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middlewares/asyncWrapper");
const auth = require("../middlewares/auth");

const getProjects = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  
  let projects;
  
  if (!req.user) {
    projects = await Project.find({ status: "completed" })
      .select("title description pic category")
      .limit(limit)
      .skip(skip);
  } else {
    projects = await Project.find().limit(limit).skip(skip);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getProjects,
    data: { projects },
  });
});

const singleProject = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.getProject,
    data: { project },
  });
});

const createProject = asyncWrapper(async (req, res, next) => {
  const { title, description, timetofinish, client, status, pic, category, cost} =
    req.body;
  const newProject = new Project({
    title,
    description,
    timetofinish,
    client,
    status,
    pic,
    category,
    cost
  });
  await newProject.save();
  res.status(201).json({
    status: httpResponse.status.created,
    message: httpResponse.message.projectCreated,
    data: { newProject },
  });
});

const updateProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const { title, description, timetofinish, client, status, pic, category, cost, timespend} = req.body;
  const newproject = await Project.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      pic,
      timetofinish,
      client,
      status,
      category,
      cost,
      timespend
    },
    { new: true }
  );
  if (!newproject) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.updateProject,
    data: { newproject },
  });
});

const delProject = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deletedproject = await Project.findByIdAndDelete({ _id: id });
  if (!deletedproject) {
    const error = errorHandler.create(
      httpResponse.message.projectNotFound,
      httpResponse.status.notfound
    );
    return next(error);
  }
  res.json({
    status: httpResponse.status.ok,
    message: httpResponse.message.deleteProject,
  });
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
  singleProject,
};

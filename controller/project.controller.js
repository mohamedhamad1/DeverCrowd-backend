const Project = require("../models/project.schema");
const httpStatus = require("../utils/httpStatus");
const errorHandler = require("../utils/errorHandler");

const getProjects = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = limit * (page - 1);
  const projects = await Project.find().limit(limit).skip(skip);
  res.json({ status: 200, message: "Projects paginated", data: { projects } });
};

const createProject = async (req, res) => {
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
    message: httpStatus.DATA.projectCreated,
    data: { newProject },
  });
};

const updateProject = async (req, res) => {
  try {
    const projectid = req.params.id;
    const updates = req.body;
    let project = await Project.findById({ _id: projectid });
    
    
    project.title = title || project.title;
    project.description = description || project.description;
    project.pic = pic || project.pic;
    project.timetofinish = timetofinish || project.timetofinish;
    project.sponser = sponser || project.sponser;
    project.status = status || project.status;
    await project.save();
    res.json({ staus: 200, message: "updated successfully", data: project });
  } catch (err) {
    res.json({ staus: 500, message: "error occurs" });
  }
};

const delProject = async (req, res) => {
  try {
    const projectId = req.params._id;

    const removedProject = await Project.findByIdAndDelete(projectId);

    if (!removedProject) {
      return res
        .json({ status: 404, message: "Project not found", data: {} });
    }

    return res.status(200).json({
      status: 200,
      message: "Project deleted successfully",
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "An error occurred" });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
};

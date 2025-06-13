const Project = require("../models/project.schema");
const httpStatus = require("../utils/httpStatus");
const errorHandler = require("../utils/errorHandler");


const getProjects = async (req, res) => {
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const skip = limit * (page - 1)
    const projects = await Project.find().limit(limit).skip(skip)
    res.json({status: 200, message:"Projects paginated", data:{projects}})
};

const createProject = async (req, res) => {
  const {title, description, timetofinish, sponser, status, pic} = req.body
  const newProject = new Project({
    title, description, timetofinish, sponser, status, pic
  })
  await newProject.save()
  res.json({status:201, message:httpStatus.DATA.projectCreated, data:{newProject}})
};

const updateProject = async (req, res) => {
  try {
    const UpdatedProject = await Project.findOne({ projectid: projectid });
    const title = req.body.title | UpdatedProject.title;
    const description = req.body.description | updateProject.description;
    const pic = req.body.pic | updateProject.pic;
    const time_to_finish = req.body.time_to_finish | updateProject.time_to_finish;
    const sponser = req.body.sponser | updateProject.sponser;
    const status = req.body.status | updateProject.status;
    data = {
      id: UpdatedProject.projectId,
      title: UpdatedProject.title,
      description: UpdatedProject.description,
      pic: UpdatedProject.pic,
      time_to_finish: UpdatedProject.time_to_finish,
      sponser: UpdatedProject.sponser,
      status: UpdatedProject.status,
    };
    res.json({ staus: 200, message: "updated successfully", data: data });
  } catch (err) {
    res.json({ staus: 500, message: "error occurs" });
  }
};

const delProject = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    if (!projectId) {
      return res.json({
        status: 400,
        message: "Project Id is required",
        data: {},
      });
    }
    const removeProject = await Project.findOne({ projectId: projectId });

    if (!removedProject) {
      return res.json({ status: 404, message: "Project not found", data: {} });
    }
    return res.json({
      status: 200,
      message: "Project deleted successfully",
      data: {},
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
};

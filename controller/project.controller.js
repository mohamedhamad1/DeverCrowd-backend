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

const singleProject = async (req, res) => {
  const {id} = req.params
  const project = await Project.findOne({_id:id})
  res.json({status: 200, message:"Project Details", data:{project}})
};

const createProject = async (req, res) => {
  const {title, description, timetofinish, sponser, status, pic} = req.body
  const newProject = new Project({
    title, description, timetofinish, sponser, status, pic
  })
  await newProject.save();
  res.json({status:201, message:httpStatus.DATA.projectCreated, data:{newProject}})
};

const updateProject = async (req, res) => {
    const id = req.params.id;
    const { title, description, pic, timetofinish, sponser, status } = req.body;
    const newproject = await Project.findOneAndUpdate(
      {_id:id},
      {
        title,
        description,
        pic,
        timetofinish,
        sponser,
        status
      },
      {new: true}
    )
    res.json({ staus: 200, message: "updated successfully", data:{newproject} });
};

const delProject = async (req, res) => {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    return res.json({status: 200,message: "Project deleted successfully",});
};


module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
  singleProject
};

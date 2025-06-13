const Project = require("../models/project.schema");
const getProjects = async (req, res) => { //swilam
  res.json({ data: "test" });
};

const createProject = async (req, res) => { //swilam
  res.json({ data: "test" });
};

const updateProject = async (req, res) => {
  
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
    const removeProject = await Project.findByIdAndRemove(projectId);

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

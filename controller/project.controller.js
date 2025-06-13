const Project = require("../models/project.schema");
const getProjects = async (req, res) => {
  res.json({ data: "test" });
};

const createProject = async (req, res) => {
  res.json({ data: "test" });
};

const updateProject = async (req, res) => {
  try {
    const { projectid, title, description, pic, time_to_finish, sponser, status } = req.body;

    let project = await Project.findOne({ projectid });

    if (!project) {
      return res.status(404).json({ status: 404, message: "Project not found" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.pic = pic | project.pic;
    project.time_to_finish = time_to_finish || project.time_to_finish;
    project.sponser = sponser || project.sponser;
    project.status = status || project.status;
    await project.save();
    data = {
      id: project.projectId,
      title: project.title,
      description: project.description,
      pic: project.pic,
      time_to_finish: project.time_to_finish,
      sponser: project.sponser,
      status: project.status,
    };
    res.json({ staus: 200, message: "updated successfully", data: data });
  } catch (err) {
    res.json({ staus: 500, message: "error occurs" });
  }
};

const delProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
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

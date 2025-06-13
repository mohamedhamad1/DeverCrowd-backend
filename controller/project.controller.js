const mongoose = require("mongoose");
const Project = require("../models/project.schema");
const getProjects = async (req, res) => {
  res.json({ data: "test" });
};

const createProject = async (req, res) => {
  res.json({ data: "test" });
};

const updateProject = async (req, res) => {
  res.json({ data: "test" });
};

const delProject = async (req, res) => {
  let removeProject = await Project.FindOne
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  delProject,
};

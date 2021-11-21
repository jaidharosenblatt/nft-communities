const axios = require("axios");
const Project = require("../models/project");
const bodyParams = require("./solanalysisParams");

async function getSolanalysisProjects() {
  const res = await axios.post(
    "https://solanalysis-graphql-dot-feliz-finance.uc.r.appspot.com/",
    bodyParams
  );
  const projects = res.data?.data?.getUpcomingProjects?.upcoming_projects;
  if (!projects) return [];
  return projects.map(
    (p) =>
      new Project({
        name: p.project_name,
        description: p.description,
      })
  );
}

module.exports = { getSolanalysisProjects };

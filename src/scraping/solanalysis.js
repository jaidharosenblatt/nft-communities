const axios = require("axios");
const bodyParams = require("./solanalysisParams");

async function getSolanalysisProjects() {
  const res = await axios.post(
    "https://solanalysis-graphql-dot-feliz-finance.uc.r.appspot.com/",
    bodyParams
  );
  const projects = res.data?.data?.getUpcomingProjects?.upcoming_projects;
  console.log(projects.length);
  if (!projects) return;
}

module.exports = { getSolanalysisProjects };

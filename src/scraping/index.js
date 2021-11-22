const Project = require("../models/project");
const { getHowRareProjects } = require("./howRare");
const { getSolanalysisProjects } = require("./solanalysis");

async function scrapeProjects() {
  try {
    const solanalysisProjects = await getSolanalysisProjects();
    const howRareProjects = await getHowRareProjects();
    const projects = solanalysisProjects.concat(howRareProjects);

    const created = await Project.insertMany(projects, {
      ordered: false,
    });
    return `${created.length} projects created`;
  } catch (e) {
    // console.log(e);
    if (e.code === 11000) {
      return `${e.insertedDocs?.length || 0} projects created`;
    }
    return e;
  }
}

module.exports = { scrapeProjects };

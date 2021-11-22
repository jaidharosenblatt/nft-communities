const Project = require("../models/project");
const { getHowRareProjects } = require("./howRare");
const { getSolanalysisProjects } = require("./solanalysis");
const { getSolanartProjects } = require("./solanart");

async function scrapeProjects() {
  try {
    const solanartProjects = await getSolanartProjects();
    const solanalysisProjects = await getSolanalysisProjects();
    const howRareProjects = await getHowRareProjects();
    const projects = solanartProjects.concat(solanalysisProjects, howRareProjects);

    const created = await Project.insertMany(projects, {
      ordered: false,
    });
    return `${created.length} projects created`;
  } catch (e) {
    if (process.env.DEBUG === "TRUE") {
      console.error(e);
    }
    if (e.code === 11000) {
      return `${e.insertedDocs?.length || 0} projects created`;
    }
    return e;
  }
}

module.exports = { scrapeProjects };

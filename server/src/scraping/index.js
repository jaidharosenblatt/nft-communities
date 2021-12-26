const Project = require("../models/project");
const { getHowRareProjects } = require("./howRare");
const { getNextDrop } = require("./nextDrop");
const { getSolanalysisProjects } = require("./solanalysis");
const { getSolanartProjects } = require("./solanart");

async function scrapeProjects() {
  try {
    const howRareProjects = await getHowRareProjects();
    const nextDropProjects = await getNextDrop();
    const solanartProjects = await getSolanartProjects();
    const solanalysisProjects = await getSolanalysisProjects();
    const projects = solanartProjects.concat(
      nextDropProjects,
      solanartProjects,
      howRareProjects,
      solanalysisProjects
    );

    // necessary to update an entire document
    const projectObjects = projects.map((p) => {
      const projectModel = new Project(p);
      const projectObject = projectModel.toObject();

      delete projectObject._id;
      return projectObject;
    });

    const ops = projectObjects.map((p) => {
      return {
        updateOne: {
          filter: { twitter: p.twitter },
          update: p,
          upsert: true,
        },
      };
    });
    const projectsCreated = await Project.bulkWrite(ops, { ordered: false });

    return projectsCreated;
  } catch (e) {
    if (process.env.DEBUG === "TRUE") {
      console.error(e);
    }
    if (e.result) {
      return e.result;
    }
    return e;
  }
}

module.exports = { scrapeProjects };

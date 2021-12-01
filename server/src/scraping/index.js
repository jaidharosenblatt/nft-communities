const Project = require("../models/project");
const { getHowRareProjects } = require("./howRare");
const { getSolanalysisProjects } = require("./solanalysis");
const { getSolanartProjects } = require("./solanart");

async function scrapeProjects() {
  try {
    const howRareProjects = await getHowRareProjects();
    const solanartProjects = await getSolanartProjects();
    const solanalysisProjects = await getSolanalysisProjects();
    const projects = solanartProjects.concat(howRareProjects, solanalysisProjects);

    // add new fields
    const updated = await Project.bulkWrite(
      projects.map((project) => ({
        updateOne: {
          filter: { twitter: project.twitter },
          update: {
            $set: {
              quantity: project.quantity,
              price: project.price,
              description: project.description,
            },
          },
        },
      }))
    );
    const created = await Project.insertMany(projects, {
      ordered: false,
    });

    return updated;
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

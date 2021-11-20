const { updateFollowers } = require("./twitter");
const Project = require("./models/project");

async function main() {
  //   const projects = await Project.find({}).sort("updatedAt").limit(299);
  //   let updates = 0;
  //   await Promise.all(
  //     projects.map(async (p) => {
  //       const updateMade = await updateFollowers(p._id);
  //       if (updateMade) {
  //         updates++;
  //       }
  //     })
  //   );
  console.log(`${updates} updates made`);
}

module.exports = main;

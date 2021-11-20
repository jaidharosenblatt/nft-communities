const { updateAllFollowers } = require("./twitter");

async function main() {
  await updateAllFollowers();
}

module.exports = main;

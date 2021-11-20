const { updateAllFollowers, updateTweetEngagement } = require("./twitter");

async function main() {
  await updateAllFollowers();
  await updateTweetEngagement();
}

module.exports = main;

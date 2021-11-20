const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");

async function main() {
  await updateAllFollowers();
  await updateTweetEngagement();
}

module.exports = main;

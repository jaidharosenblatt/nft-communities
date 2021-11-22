const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");

async function everyThirtyMins() {
  await updateAllFollowers();
  await updateTweetEngagement();
}

async function everyDay() {
  await scrapeProjects();
}

module.exports = { everyThirtyMins, everyDay };

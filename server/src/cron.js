const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");
const { updateAllProjectTrends } = require("./trends");

async function everyThirtyMins() {
  await updateTweetEngagement();
}

async function everyDay() {
  await updateAllFollowers();
  await scrapeProjects();
  await updateTweetEngagement();
  await updateAllProjectTrends();
}

module.exports = { everyThirtyMins, everyDay };

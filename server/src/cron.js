const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");
const { updateAllProjectTrends } = require("./trends");

async function everyThirtyMins() {
  await updateTweetEngagement();
}

async function everyDay() {
  await scrapeProjects();
  await updateAllFollowers();
  await updateTweetEngagement();
  await updateAllProjectTrends();
}

module.exports = { everyThirtyMins, everyDay };

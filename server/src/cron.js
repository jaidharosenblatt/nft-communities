const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");
const { updateAllProjectTrends } = require("./trends");
const { updateAggregate } = require("./trends/aggregation");

async function everyFifthHour() {
  await updateTweetEngagement();
}

async function everyDay() {
  await scrapeProjects();
  await updateAllFollowers();
  await updateTweetEngagement();
  await updateAllProjectTrends();
  await updateAggregate();
}

module.exports = { everyFifthHour, everyDay };

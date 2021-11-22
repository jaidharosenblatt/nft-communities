const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");

async function everyThirtyMins() {
  await updateTweetEngagement();
}

async function everyDay() {
  await updateAllFollowers();
  await scrapeProjects();
}

module.exports = { everyThirtyMins, everyDay };

const { updateAllFollowers, updateTweetEngagement } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");
const { updateAllProjectTrends } = require("./trends");
const { updateAggregate } = require("./trends/aggregation");

async function everHour() {
  console.log("RUNNING CRON");
  console.log("----------------");
  await updateTweetEngagement();
  await updateAllProjectTrends();

  console.log("----------------");
  console.log("FINISHING CRON");
}

async function everyDay() {
  try {
    await scrapeProjects();
    await updateAllFollowers();
    await updateTweetEngagement();
    await updateAllProjectTrends();
    await updateAggregate();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { everHour, everyDay };

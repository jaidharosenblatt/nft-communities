const { updateAllFollowers } = require("./api/twitter");
const { scrapeProjects } = require("./scraping");
const { updateAllProjectTrends } = require("./trends");
const { updateAggregate } = require("./trends/aggregation");

async function runCron() {
  try {
    await scrapeProjects();
    await updateAllFollowers();
    await updateAllProjectTrends();
    await updateAggregate();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { runCron };

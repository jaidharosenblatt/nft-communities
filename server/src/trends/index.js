const Moment = require("../models/moment");
const Project = require("../models/project");
const Trend = require("../models/trend");

async function updateAllProjectTrends() {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      await createTrendAndDeleteArchives(project._id, "day");
      await createTrendAndDeleteArchives(project._id, "week");
      await createTrendAndDeleteArchives(project._id, "month");
      await createTrendAndDeleteArchives(project._id, "all");
    })
  );
}

async function createTrendAndDeleteArchives(projectId, time) {
  const trend = await getTrendObject(projectId, time);
  const t = new Trend(trend);
  const newTrend = await t.save();
  // delete all other trends for this project/time period not matching the new trend
  await Trend.deleteMany({ project: projectId, timePeriod: time, _id: { $ne: newTrend._id } });
  return newTrend._id;
}

// Get object to be created in trend
async function getTrendObject(projectId, time) {
  // find most recent scraped moment
  const recentMoment = await Moment.findOne({ project: projectId }, {}, { sort: "-createdAt" });

  let agoMoment;
  // get oldest if all time
  if (time === "all") {
    agoMoment = await Moment.findOne({ project: projectId }, {}, { sort: "createdAt" });
  } else {
    // day time range but most recent first
    const today = new Date();
    const millisecondsAgo = timeMap[time];
    const start = new Date(today.getTime() - millisecondsAgo - timeMap.day);
    const end = new Date(today.getTime() - millisecondsAgo);
    agoMoment = await Moment.findOne(
      {
        createdAt: { $gt: start, $lte: end },
        project: projectId,
      },
      {},
      { sort: "-createdAt" } // get most recent most within this range
    );
  }
  let trend = {
    project: projectId,
    timePeriod: time,
    startFollowers: agoMoment?.twitterFollowers || recentMoment.twitterFollowers,
    endFollowers: recentMoment.twitterFollowers,
    followingChange: 0,
    followingPercentChange: 0,
  };

  // return default if empty of records are same
  if (!recentMoment || !agoMoment || recentMoment._id === agoMoment._id) {
    return trend;
  }

  const following = percentIncrease(agoMoment.twitterFollowers, recentMoment.twitterFollowers);

  return {
    ...trend,
    followingChange: following.change,
    followingPercentChange: following.percent,
  };
}

function percentIncrease(start, end) {
  const change = (end - start).toFixed(1);
  let percent;
  if (start === 0 && end === 0) {
    percent = 0;
  } else if (start === 0 || end === 0) {
    percent = undefined;
  } else {
    percent = ((change / start) * 100).toFixed(2);
  }

  return { percent, change };
}

const timeMap = {
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  all: -1,
};

module.exports = { updateAllProjectTrends };

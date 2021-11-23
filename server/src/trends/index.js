const Moment = require("../models/moment");
const Project = require("../models/project");
const Trend = require("../models/trend");

async function updateAllProjectTrends() {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      const recentMoment = await Moment.findOne(
        { project: project._id },
        {},
        { sort: "-createdAt" }
      );
      if (recentMoment) {
        await createTrendAndDeleteArchives(project._id, recentMoment, "day");
        await createTrendAndDeleteArchives(project._id, recentMoment, "week");
        await createTrendAndDeleteArchives(project._id, recentMoment, "month");
        await createTrendAndDeleteArchives(project._id, recentMoment, "all");
      } else {
        console.log(project);
      }
    })
  );
}

async function createTrendAndDeleteArchives(projectId, recentMoment, time) {
  try {
    const trend = await getTrendObject(projectId, recentMoment, time);
    const t = new Trend(trend);
    const newTrend = await t.save();
    // delete all other trends for this project/time period not matching the new trend
    await Trend.deleteMany({
      project: projectId,
      timePeriod: time,
      _id: { $ne: newTrend._id },
    });
    return newTrend._id;
  } catch (error) {
    console.log(error);
  }
}

// Get object to be created in trend
async function getTrendObject(projectId, recentMoment, time) {
  // find most recent scraped moment

  let agoMoment;
  // get oldest if all time
  if (time === "all") {
    agoMoment = await Moment.findOne({ project: projectId }, {}, { sort: "createdAt" });
  } else {
    const today = new Date();
    const end = new Date();
    const start = new Date();

    const daysOffset = dateMap[time];
    end.setDate(today.getDate() - daysOffset);
    // offset by one more day
    start.setDate(today.getDate() - daysOffset - 1);

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
    startEngagement: agoMoment?.twitterAverageEngagement || recentMoment.twitterAverageEngagement,
    endEngagement: recentMoment.twitterAverageEngagement,
    followingChange: 0,
    followingPercentChange: 0,
    engagementChange: 0,
    engagementPercentChange: 0,
  };

  // return default if empty of records are same
  if (!recentMoment || !agoMoment || recentMoment._id === agoMoment._id) {
    return trend;
  }

  const following = percentIncrease(agoMoment.twitterFollowers, recentMoment.twitterFollowers);
  const engagement = percentIncrease(
    agoMoment.twitterAverageEngagement,
    recentMoment.twitterAverageEngagement
  );

  return {
    ...trend,
    followingChange: following.change,
    followingPercentChange: following.percent,
    engagementChange: engagement.change,
    engagementPercentChange: engagement.percent,
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

const dateMap = {
  day: 1,
  week: 7,
  month: 30,
};

module.exports = { updateAllProjectTrends };

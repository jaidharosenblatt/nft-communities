const Moment = require("../models/moment");
const Project = require("../models/project");
const Trend = require("../models/trend");

async function updateAllProjectTrends() {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      const hourAgo = await getTrend(project._id, 1000 * 60 * 60);
      const dayAgo = await getTrend(project._id, 1000 * 60 * 60 * 24);
      const weekAgo = await getTrend(project._id, 1000 * 60 * 60 * 24 * 7);
      const monthAgo = await getTrend(project._id, 1000 * 60 * 60 * 24 * 30);
      console.log(hourAgo);
    })
  );
}

async function getTrend(projectId, millisecondsAgo) {
  const trend = await getChange(projectId, millisecondsAgo);
  const t = new Trend(trend);
  return await t.save();
}

async function getChange(projectId, millisecondsAgo) {
  // find most recent scrape
  const recentMoment = await Moment.findOne({ project: projectId }, {}, { sort: "-createdAt" });
  const today = new Date();

  // day time range but most recent first
  const oneDay = 1000 * 60 * 60 * 24;
  const start = new Date(today.getTime() - millisecondsAgo - oneDay);
  const end = new Date(today.getTime() - millisecondsAgo);
  const agoMoment = await Moment.findOne(
    {
      createdAt: { $gt: start, $lte: end },
      project: projectId,
    },
    {},
    { sort: "-createdAt" } // get most recent most within this range
  );

  let trend = {
    project: projectId,
    startFollowers: agoMoment?.twitterFollowers || recentMoment.twitterFollowers,
    endFollowers: recentMoment.twitterFollowers,
    followingChange: 0,
    followingPercentChange: 0,
    startEngagement: agoMoment?.twitterAverageEngagement || recentMoment.twitterAverageEngagement,
    endEngagement: recentMoment.twitterAverageEngagement,
    engagementChange: 0,
    engagementPercentChange: 0,
  };
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

module.exports = { updateAllProjectTrends };

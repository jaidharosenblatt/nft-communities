const Moment = require("../models/moment");
const Project = require("../models/project");

async function updateAllProjectTrends() {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      const hourAgo = await getChange(project._id, 1000 * 60 * 60);
      const dayAgo = await getChange(project._id, 1000 * 60 * 60 * 24);
      const weekAgo = await getChange(project._id, 1000 * 60 * 60 * 24 * 7);
      const monthAgo = await getChange(project._id, 1000 * 60 * 60 * 24 * 30);
      console.log(hourAgo);
    })
  );
}
async function getChange(projectId, millisecondsAgo) {
  // find most recent scrape
  const recentMoment = await Moment.findOne({ project: projectId }, {}, { sort: "-createdAt" });
  const today = new Date();

  // range of time to find moments (in milliseconds)
  const oneDay = 1000 * 60 * 60 * 24;
  const queryRange = Math.min(millisecondsAgo * 2, oneDay);

  const start = new Date(today.getTime() - millisecondsAgo - queryRange);
  const end = new Date(today.getTime() - millisecondsAgo);
  const agoMoment = await Moment.findOne(
    {
      createdAt: { $gt: start, $lte: end },
      project: projectId,
    },
    {},
    { sort: "-createdAt" } // get most recent most within this range
  );

  if (!recentMoment || !agoMoment || recentMoment._id === agoMoment._id) {
    return {
      followingChange: 0,
      followingPercentChange: 0,
      engagementChange: 0,
      engagementPercentChange: 0,
    };
  }

  const following = percentIncrease(agoMoment.twitterFollowers, recentMoment.twitterFollowers);
  const engagement = percentIncrease(
    agoMoment.twitterAverageEngagement,
    recentMoment.twitterAverageEngagement
  );

  return {
    startFollowers: agoMoment.twitterFollowers,
    endFollowers: recentMoment.twitterFollowers,
    followingChange: following.change,
    followingPercentChange: following.percent,
    startEngagement: agoMoment.twitterAverageEngagement,
    endEngagement: recentMoment.twitterAverageEngagement,
    engagementChange: engagement.change,
    engagementPercentChange: engagement.percent,
  };
}

function percentIncrease(start, end) {
  const change = (end - start).toFixed(1);
  let percent;
  if (start === 0 && end === 0) {
    percent = 0;
  } else if (start === 0 && end === 0) {
    percent = undefined;
  } else {
    percent = ((change / start) * 100).toFixed(2);
  }

  return { percent, change };
}

module.exports = { updateAllProjectTrends };

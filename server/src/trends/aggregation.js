const Aggregation = require("../models/aggregation");
const Moment = require("../models/moment");
const Project = require("../models/project");

async function updateAggregate() {
  // delete all past aggregations
  await Aggregation.deleteMany({});

  const moments = await Moment.find().sort("createdAt").limit(1);
  const lastMoment = moments[0].createdAt;
  const projects0 = await Moment.find().sort("-twitterFollowers").limit(1);
  const highestFollowers = projects0[0].twitterFollowers || 0;

  const projects1 = await Moment.find().sort("-twitterAverageTweetEngagement").limit(1);
  const highestTweetLikes = projects1[0].twitterAverageTweetEngagement || 0;

  const projects2 = await Moment.find().sort("-twitterAverageMentionEngagement").limit(1);
  const highestMentionLikes = projects2[0].twitterAverageMentionEngagement || 0;

  const projects3 = await Project.find().sort("-quantity").limit(1);
  const highestQuantity = projects3[0].quantity || 0;

  const projects4 = await Project.find().sort("-price").limit(1);
  const highestPrice = projects4[0].price || 0;

  function roundTo(number, round) {
    if (number === 0) {
      return 0;
    }
    return Math.ceil(number / round) * round;
  }

  const aggregation = new Aggregation({
    lastMoment,
    highestFollowers,
    highestTweetLikes,
    highestMentionLikes,
    highestFollowersRounded: roundTo(highestFollowers, 10000),
    highestTweetLikesRounded: roundTo(highestTweetLikes, 1000),
    highestMentionLikesRounded: roundTo(highestMentionLikes, 100),
    highestPrice: roundTo(highestPrice, 10),
    highestQuantity: roundTo(highestQuantity, 10000),
  });
  return await aggregation.save();
}

module.exports = { updateAggregate };

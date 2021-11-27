const Aggregation = require("../models/aggregation");
const Moment = require("../models/moment");

async function updateAggregate() {
  // delete all past aggregations
  await Aggregation.deleteMany({});

  const moments = await Moment.find().sort("createdAt").limit(1);
  const lastMoment = moments[0].createdAt;
  const projects0 = await Moment.find().sort("-twitterFollowers").limit(1);
  const highestFollowers = projects0[0].twitterFollowers;

  const projects1 = await Moment.find().sort("-twitterAverageTweetEngagement").limit(1);
  const highestTweetLikes = projects1[0].twitterAverageTweetEngagement;

  const projects2 = await Moment.find().sort("-twitterAverageMentionEngagement").limit(1);
  const highestMentionLikes = projects2[0].twitterAverageMentionEngagement;

  const projects3 = await Moment.find().sort("-twitterAverageEngagement").limit(1);
  const highestLikes = projects3[0].twitterAverageEngagement;

  function roundToHundred(number) {
    return Math.ceil(number / 100) * 100;
  }
  function roundToThousand(number) {
    return Math.ceil(number / 1000) * 1000;
  }
  function roundToTenThousand(number) {
    return Math.ceil(number / 10000) * 10000;
  }

  const aggregation = new Aggregation({
    lastMoment,
    highestFollowers,
    highestTweetLikes,
    highestMentionLikes,
    highestLikes,
    highestFollowersRounded: roundToTenThousand(highestFollowers),
    highestTweetLikesRounded: roundToThousand(highestTweetLikes),
    highestMentionLikesRounded: roundToHundred(highestMentionLikes),
    highestLikesRounded: roundToThousand(highestLikes),
  });
  return await aggregation.save();
}

module.exports = { updateAggregate };

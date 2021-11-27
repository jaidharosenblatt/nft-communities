const mongoose = require("mongoose");

const aggregationSchema = new mongoose.Schema({
  highestFollowers: { type: Number, required: true },
  highestTweetLikes: { type: Number, required: true },
  highestMentionLikes: { type: Number, required: true },
  highestLikes: { type: Number, required: true },
  lastMoment: { type: Date, required: true },
  highestFollowersRounded: { type: Number, required: true },
  highestTweetLikesRounded: { type: Number, required: true },
  highestMentionLikesRounded: { type: Number, required: true },
  highestLikesRounded: { type: Number, required: true },
});

const Aggregation = mongoose.model("Aggregation", aggregationSchema);

module.exports = Aggregation;

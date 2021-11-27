const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    timePeriod: {
      type: String,
      enum: ["day", "week", "month", "all"],
      required: true,
    },
    startFollowers: {
      type: Number,
      required: true,
    },
    endFollowers: {
      type: Number,
      required: true,
    },
    followingChange: {
      type: Number,
      required: true,
    },
    followingPercentChange: {
      type: Number,
      required: false,
    },
    startTweetEngagement: {
      type: Number,
      required: true,
    },
    endTweetEngagement: {
      type: Number,
      required: true,
    },
    tweetEngagementChange: {
      type: Number,
      required: true,
    },
    tweetEngagementPercentChange: {
      type: Number,
      required: false,
    },
    startMentionEngagement: {
      type: Number,
      required: true,
    },
    endMentionEngagement: {
      type: Number,
      required: true,
    },
    tweetMentionChange: {
      type: Number,
      required: true,
    },
    tweetMentionPercentChange: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Trend = mongoose.model("Trend", trendSchema);

module.exports = Trend;

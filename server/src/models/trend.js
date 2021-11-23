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
    startEngagement: {
      type: Number,
      required: true,
    },
    endEngagement: {
      type: Number,
      required: true,
    },
    engagementChange: {
      type: Number,
      required: true,
    },
    engagementPercentChange: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Trend = mongoose.model("Trend", trendSchema);

module.exports = Trend;

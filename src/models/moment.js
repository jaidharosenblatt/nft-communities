const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
    },
    twitterFollowers: {
      type: Number,
    },
    twitterAverageMentionEngagement: {
      type: Number,
    },
    twitterAverageTweetEngagement: {
      type: Number,
    },
    twitterAverageNTweetEngagement: {
      type: Number,
    },
    twitterAverageEngagement: {
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;

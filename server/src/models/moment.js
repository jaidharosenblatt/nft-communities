const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    twitterFollowers: {
      type: Number,
      required: true,
    },
    twitterAverageMentionEngagement: {
      type: Number,
      required: true,
    },
    twitterAverageTweetEngagement: {
      type: Number,
      required: true,
    },
    twitterAverageNTweetEngagement: {
      type: Number,
      required: true,
    },
    twitterAverageEngagement: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;

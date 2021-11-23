const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    momentLastUpdate: {
      type: Date,
    },
    releaseDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      unique: true,
    },
    discordUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    twitterUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    twitter: {
      type: String,
      unique: true,
    },
    twitterId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

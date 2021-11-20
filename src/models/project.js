const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
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
    discord: {
      type: String,
      unique: true,
    },
    twitter: {
      type: String,
      unique: true,
    },
    twitterId: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
      unique: true,
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

projectSchema.virtual("twitterUrl").get(function () {
  if (this.twitter) {
    return "https://twitter.com/" + this.twitter;
  }
});

projectSchema.virtual("discordUrl").get(function () {
  if (this.discord) {
    return "https://discord.gg/" + this.discord;
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

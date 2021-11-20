const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
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
    twitterFollowers: {
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.virtual("twitterUrl").get(function () {
  return "https://twitter.com/" + this.twitter;
});

projectSchema.virtual("discordUrl").get(function () {
  return "https://discord.gg/" + this.discord;
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

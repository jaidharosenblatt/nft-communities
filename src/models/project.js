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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

const mongoose = require("mongoose");
const Trend = require("./trend");

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

    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    website: {
      type: String,
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
    twitterCreatedAt: {
      type: String,
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
    discordMembers: {
      type: Number,
    },
    discordActiveMembers: {
      type: Number,
    },
    dayTrend: {
      type: mongoose.Types.ObjectId,
      ref: Trend,
    },
    weekTrend: {
      type: mongoose.Types.ObjectId,
      ref: Trend,
    },
    monthTrend: {
      type: mongoose.Types.ObjectId,
      ref: Trend,
    },
    allTrend: {
      type: mongoose.Types.ObjectId,
      ref: Trend,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

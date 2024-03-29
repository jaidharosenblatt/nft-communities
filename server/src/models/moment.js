const mongoose = require("mongoose");
const Project = require("./project");

const momentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Project,
    },
    twitterFollowers: {
      type: Number,
      required: true,
    },
    discordMembers: {
      type: Number,
      required: false,
    },
    discordActiveMembers: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;

const mongoose = require("mongoose");

const aggregationSchema = new mongoose.Schema({
  highestFollowers: { type: Number, required: true },
  lastMoment: { type: Date, required: true },
  highestFollowersRounded: { type: Number, required: true },
  highestPrice: { type: Number, required: true },
  highestQuantity: { type: Number, required: true },
});

const Aggregation = mongoose.model("Aggregation", aggregationSchema);

module.exports = Aggregation;

const express = require("express");
const mongoose = require("mongoose");
const Aggregation = require("../models/aggregation");
const Moment = require("../models/moment");
const Trend = require("../models/trend");
const { updateAllProjectTrends } = require("../trends");
const { updateAggregate } = require("../trends/aggregation");
const { sendError, getParamVariable, ServerError } = require("./util");

const router = new express.Router();

router.post("/trends/update", async (req, res) => {
  try {
    res.send("Updating");
    await updateAllProjectTrends();
    console.log("Finished updating trends");
  } catch (e) {
    sendError(e, res);
  }
});

router.post("/aggregate", async (req, res) => {
  try {
    const aggregate = await updateAggregate();
    res.send(aggregate);
  } catch (e) {
    sendError(e, res);
  }
});

router.get("/aggregate", async (req, res) => {
  try {
    const aggregation = await Aggregation.findOne(
      {},
      {
        highestFollowersRounded: 1,
        highestTweetLikesRounded: 1,
        highestMentionLikesRounded: 1,
        lastMoment: 1,
        highestQuantity: 1,
        highestPrice: 1,
      }
    );
    res.send(aggregation);
  } catch (e) {
    sendError(e, res);
  }
});

router.get("/graph/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new ServerError(400, "Invalid objectId");
    }
    const projectId = mongoose.Types.ObjectId(req.params.id);
    const allowedFields = [
      "twitterFollowers",
      "twitterAverageMentionEngagement",
      "twitterAverageTweetEngagement",
    ];
    const field = getParamVariable(req, "field", "twitterFollowers", allowedFields);
    const trends = await Moment.find({ project: projectId }, { createdAt: -1 }).select({
      [field]: 1,
      createdAt: 1,
    });

    // make date simple date (ignore time)
    const withOutTime = trends.map((trend) => {
      const d = new Date(trend.createdAt);
      const newDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return {
        value: trend[field],
        date: newDate.toUTCString(),
      };
    });

    // remove duplicate dates
    const uniqueDates = withOutTime.filter(
      (e, i) => withOutTime.findIndex((a) => a.date === e.date) === i
    );

    res.send(uniqueDates.reverse());
  } catch (e) {
    sendError(e, res);
  }
});

module.exports = router;

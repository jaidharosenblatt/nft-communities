const express = require("express");
const Aggregation = require("../models/aggregation");
const { updateAllProjectTrends } = require("../trends");
const { updateAggregate } = require("../trends/aggregation");
const { sendError } = require("./util");

const router = new express.Router();

router.post("/trends/update", async (req, res) => {
  try {
    const status = await updateAllProjectTrends();
    res.send(status);
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
        highestLikesRounded: 1,
        lastMoment: 1,
      }
    );
    res.send(aggregation);
  } catch (e) {
    sendError(e, res);
  }
});

module.exports = router;

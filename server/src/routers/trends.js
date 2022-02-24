const { default: axios } = require("axios");
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

router.get("/eden", async (req, res) => {
  const response = await axios.get(
    "https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics"
  );

  function queryToInt(val, _default) {
    const int = parseInt(val);
    return isNaN(int) ? _default : int;
  }
  const week = req.query.range === "week";
  const value = week ? "value7d" : "value1d";
  const prev = week ? "prev7d" : "prev1d";
  const volumeWeek = queryToInt(req.query.minVolWeek, 2000);
  const volumeDay = queryToInt(req.query.minVolDay, 20);
  const price = queryToInt(req.query.maxPrice, 5);

  function diff(a) {
    return (
      percentIncrease(a.avgPrice[prev], a.avgPrice[value]) -
      percentIncrease(a.txVolume[prev], a.txVolume[value])
    );
  }

  function percentIncrease(start, end) {
    if (start === 0 || end === 0) {
      return 0;
    } else {
      return (((end - start) / start) * 100).toFixed(2);
    }
  }

  const data = response.data.results;
  const filtered = data.filter(
    (d) =>
      d.txVolume !== undefined &&
      d.avgPrice !== undefined &&
      d.txVolume.value1d > volumeDay &&
      d.txVolume.value7d > volumeWeek &&
      d.floorPrice.value1d < price
  );

  const sorted = filtered.sort((a, b) => {
    return diff(a) - diff(b);
  });
  const truncated = sorted.map((d) => {
    return {
      name: d.name,
      price1: d.avgPrice.value1d,
      price7: d.avgPrice.value7d,
      floor: d.floorPrice.value1d,
      volume1: d.txVolume.value1d,
      volume7: d.txVolume.value7d,
      percPrice: percentIncrease(d.avgPrice[prev], d.avgPrice[value]) + "%",
      percVol: percentIncrease(d.txVolume[prev], d.txVolume[value]) + "%",
    };
  });
  res.send(truncated);
});

module.exports = router;

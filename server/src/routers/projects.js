const express = require("express");
const Project = require("../models/project");
const { updateAllFollowers, updateTweetEngagement } = require("../api/twitter");
const { scrapeProjects } = require("../scraping/");
const { getParamVariable, sendError } = require("./util");

const router = new express.Router();

router.post("/updateProjects", async (req, res) => {
  try {
    const status = await scrapeProjects();
    res.send(status);
  } catch (e) {
    sendError(e, res);
  }
});

router.post("/updateTwitter", async (req, res) => {
  try {
    await updateAllFollowers();
    res.send("updates");
  } catch (e) {
    sendError(e, res);
  }
});

router.post("/updateTweets", async (req, res) => {
  try {
    await updateTweetEngagement();
    res.send("updates");
  } catch (e) {
    sendError(e, res);
  }
});

router.get("/projects", async (req, res) => {
  try {
    const trendType = getParamVariable(req, "trendType", "allTrend", [
      "dayTrend",
      "weekTrend",
      "monthTrend",
      "allTrend",
    ]);
    const sortBy = getParamVariable(req, "sortBy", "twitterFollowers", [
      "twitterFollowers",
      "trends.followingPercentChange",
      "trends.engagementPercentChange",
      "trends.followingChange",
      "trends.engagementChange",
      "releaseDate",
      "name",
      "twitterAverageTweetEngagement",
      "twitterFollowers",
    ]);

    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const limit = req.query.limit || 100;

    const projects0 = await Project.aggregate([
      { $match: { releaseDate: { $gt: new Date() } } }, // query within date range
      {
        // find trend matching this project
        $lookup: {
          from: "trends",
          localField: trendType,
          foreignField: "_id",
          as: "trends",
        },
      },
      { $unwind: { path: "$trends" } }, // make trends one element
      {
        $project: {
          name: 1,
          releaseDate: 1,
          avatar: 1,
          "trends.followingPercentChange": 1,
          "trends.followingChange": 1,
          "trends.engagementPercentChange": 1,
          "trends.engagementChange": 1,
          twitterFollowers: 1,
          twitterUrl: 1,
          twitterAverageTweetEngagement: 1,
        },
      },
    ])
      .sort({ [sortBy]: sortDirection })
      .limit(limit);

    res.send(projects0);
  } catch (e) {
    sendError(e, res);
  }
});

module.exports = router;

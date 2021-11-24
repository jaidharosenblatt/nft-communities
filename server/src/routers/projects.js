const express = require("express");
const Project = require("../models/project");
const { updateAllFollowers, updateTweetEngagement } = require("../api/twitter");
const { scrapeProjects } = require("../scraping/");
const { getParamVariable, sendError, isValidDate } = require("./util");

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
    const allowedFields = [
      "twitterFollowers",
      "trends.followingPercentChange",
      "trends.engagementPercentChange",
      "trends.followingChange",
      "trends.engagementChange",
      "releaseDate",
      "name",
      "twitterAverageTweetEngagement",
      "twitterFollowers",
    ];
    const sortBy = getParamVariable(req, "sortBy", "twitterFollowers", allowedFields);

    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const limit = req.query.limit || 100;

    // start in make range
    let startDate = new Date(-8640000000000000);
    let endDate = new Date(8640000000000000);

    // add in query specified dates (can be in any Date format that JS accepts)
    if (req.query.startDate) {
      const parsedStartDate = new Date(req.query.startDate);
      parsedStartDate.setDate(parsedStartDate.getDate() - 1); //add one to end date to include that day's drops
      startDate = isValidDate(parsedStartDate) && parsedStartDate;
    }
    if (req.query.endDate) {
      const parsedEndDate = new Date(req.query.endDate);
      endDate = isValidDate(parsedEndDate) && parsedEndDate;
    }
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const projects0 = await Project.aggregate([
      { $match: { releaseDate: { $gte: startDate, $lt: endDate } } }, // query within date range
      { $match: filters },
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
          avatarLarge: 1,
          website: 1,
          discordUrl: 1,
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

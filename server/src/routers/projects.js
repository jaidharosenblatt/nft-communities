const express = require("express");
const Project = require("../models/project");
const { updateAllFollowers, updateTweetEngagement } = require("../api/twitter");
const { scrapeProjects } = require("../scraping/");
const Trend = require("../models/trend");

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
    const projects0 = await Project.aggregate([
      { $match: { releaseDate: { $gt: new Date() } } }, // query within date range
      {
        // find trend matching this project
        $lookup: {
          from: "trends",
          localField: "allTrend",
          foreignField: "_id",
          as: "trends",
        },
      },
      { $unwind: { path: "$trends" } }, // make trends one element
      {
        $project: {
          name: 1,
          campId: 1,
          articleId: 1,
          releaseDate: 1,
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
      .sort("-trends.followingChange")
      .limit(100);

    res.send(projects0);
  } catch (e) {
    sendError(e, res);
  }
});

function sendError(e, res) {
  if (process.env.DEBUG === "TRUE") {
    console.error(e);
  }
  const code = e.code || 500;
  res.status(code);
  res.send(e.data);
}

module.exports = router;

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

router.post("/projects", async (req, res) => {
  try {
    const project = Project(req.body);
    const p = await project.save();
    res.send(p);
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
      "releaseDate",
      "twitterFollowers",
      "name",
      "trends.followingChange",
      "trends.followingPercentChange",
      "trends.tweetEngagementChange",
      "trends.tweetEngagementPercentChange",
      "trends.tweetMentionChange",
      "trends.tweetMentionPercentChange",
      "twitterAverageTweetEngagement",
      "twitterAverageMentionEngagement",
      "quantity",
      "price",
    ];
    const sortBy = getParamVariable(req, "sortBy", "twitterFollowers", allowedFields);
    const sortDirection = req.query.sortDirection ? parseInt(req.query.sortDirection) : -1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    // start in make range
    let startDate;
    let endDate;

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
    const aggregate = [
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
          "trends.followingChange": 1,
          "trends.followingPercentChange": 1,
          "trends.tweetEngagementChange": 1,
          "trends.tweetEngagementPercentChange": 1,
          "trends.tweetMentionChange": 1,
          "trends.tweetMentionPercentChange": 1,
          description: 1,
          quantity: 1,
          price: 1,
          twitterFollowers: 1,
          twitterUrl: 1,
          twitterAverageTweetEngagement: 1,
          twitterAverageMentionEngagement: 1,
          twitterCreatedAt: 1,
        },
      },
      { $sort: { [sortBy]: sortDirection } },
      {
        $facet: {
          count: [{ $count: "count" }],
          projects: [{ $skip: skip * limit }, { $limit: limit }],
        },
      },
    ];

    // push date filters only if queries were passed in
    const startDateFilter = { $match: { releaseDate: { $gte: startDate } } };
    const endDateFilter = { $match: { releaseDate: { $lt: endDate } } };
    startDate && aggregate.unshift(startDateFilter);
    endDate && aggregate.unshift(endDateFilter);

    const q = await Project.aggregate(aggregate);

    const projects = q[0].projects;
    let count = 0;
    if (q[0]?.count[0]) {
      count = q[0].count[0].count;
    }

    res.send({ projects, count });
  } catch (e) {
    sendError(e, res);
  }
});

module.exports = router;

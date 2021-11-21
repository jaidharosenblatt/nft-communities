const express = require("express");
const Project = require("../models/project");
const { updateAllFollowers, updateTweetEngagement } = require("../api/twitter");
const { scrapeProjects } = require("../scraping/");

const router = new express.Router();

router.post("/updateProjects", async (req, res) => {
  try {
    const status = await scrapeProjects();
    res.send(status);
  } catch (e) {
    res.status(e.code);
    res.send(e.data);
  }
});

router.post("/updateTwitter", async (req, res) => {
  try {
    await updateAllFollowers();
    res.send("updates");
  } catch (e) {
    console.log(e);
    console.log(e.data?.errors[0]);

    res.status(e.code);
    res.send(e.data);
  }
});

router.post("/updateTweets", async (req, res) => {
  try {
    await updateTweetEngagement();
    res.send("updates");
  } catch (e) {
    res.status(e.code);
    res.send(e.data);
  }
});

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).sort("-twitterAverageEngagement");
    res.send(projects);
  } catch (e) {
    res.status(e.code);
    res.send(e.data);
  }
});

module.exports = router;

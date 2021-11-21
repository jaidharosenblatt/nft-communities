const express = require("express");
const Project = require("../models/project");
const { getHowRareProjects } = require("../scraping/howRare");
const { updateAllFollowers, updateTweetEngagement } = require("../api/twitter");
const { getSolanalysisProjects } = require("../scraping/solanalysis");

const router = new express.Router();

router.post("/updateProjects", async (req, res) => {
  try {
    // await getSolanalysisProjects();
    const projects = await getHowRareProjects();
    const created = await Project.insertMany(projects, {
      ordered: false,
    });
    res.send(created);
  } catch (e) {
    console.log(e);
    // duplicate key error
    if (e.code === 11000) {
      res.sendStatus(200);
    }

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

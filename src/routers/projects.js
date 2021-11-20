const express = require("express");
const Project = require("../models/project");
const { getHowRareProjects } = require("../scraping");
const { updateAllFollowers } = require("../twitter");

const router = new express.Router();

router.post("/updateProjects", async (req, res) => {
  try {
    const projects = await getHowRareProjects();
    const created = await Project.insertMany(projects, {
      ordered: false,
      silent: true,
    });
    res.send(created);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/updateTwitter", async (req, res) => {
  try {
    await updateAllFollowers();
    res.send("updates");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).sort("-twitterFollowers");
    res.send(projects);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;

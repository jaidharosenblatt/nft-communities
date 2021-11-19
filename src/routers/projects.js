const express = require("express");
const Project = require("../models/project");
const { getHowRareProjects } = require("../scraping");
const { updateFollowers } = require("../twitter");

const router = new express.Router();

router.post("/updateProjects", async (req, res) => {
  try {
    const projects = await getHowRareProjects();
    const created = await Project.insertMany(projects, { ordered: false });
    res.send(created);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/updateTwitter", async (req, res) => {
  try {
    const projects = await Project.find({}).sort("updatedAt").limit(299);
    let updates;
    await Promise.all(
      projects.map(async (p) => {
        const updateMade = await updateFollowers(p._id);
        if (updateMade) {
          updates++;
        }
      })
    );
    res.send(updates);
  } catch (error) {
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

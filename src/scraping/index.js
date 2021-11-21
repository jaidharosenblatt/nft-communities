const express = require("express");
const Project = require("../models/project");
const { getHowRareProjects } = require("./howRare");
const { getSolanalysisProjects } = require("./solanalysis");

async function scrapeProjects() {
  try {
    // await getSolanalysisProjects();
    // return "OK";
    const projects = await getHowRareProjects();
    const created = await Project.insertMany(projects, {
      ordered: false,
    });
    return `${created.length} projects created`;
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return `${e.insertedDocs?.length || 0} projects created`;
    }
    return e;
  }
}

function getTwitterUsernameFromUrl(url) {
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://twitter.com/")[1].toString();
  const withoutAt = handle.startsWith("@")
    ? handle.slice(1, handle.length)
    : handle;
  return withoutAt.endsWith("/") ? withoutAt.slice(0, -1) : withoutAt;
}

function getDiscordIdFromUrl(url) {
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://discord.gg/")[1].toString();
  return handle.endsWith("/") ? handle.slice(0, handle.length - 1) : handle;
}

module.exports = {
  scrapeProjects,
  getTwitterUsernameFromUrl,
  getDiscordIdFromUrl,
};

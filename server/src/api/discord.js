const Project = require("../models/project");
const axios = require("axios");

async function getDiscordFromUrl(discordUrl) {
  const splitIndex = discordUrl.lastIndexOf("/");

  if (splitIndex == -1) {
    return undefined;
  }
  const inviteCode = discordUrl.slice(splitIndex + 1, discordUrl.length);
  try {
    const res = await axios.get(
      `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`
    );

    return {
      total: res.data.approximate_member_count,
      active: res.data.approximate_presence_count,
    };
  } catch (error) {
    if (error.response) {
      return { timeout: error.response.headers["retry-after"] };
    }
    return { timeout: 1000 };
  }
}

async function updateDiscord() {
  const projects = await Project.find().sort("-twitterFollowers");
  const discords = [];
  for (const project of projects) {
    const discord = await getDiscordFromUrl(project.discordUrl);
    if (discord.timeout) {
      console.log("Waiting for timeout:", discord.timeout);

      await timeout(discord.timeout);
    } else {
      project.discordMembers = discord.total;
      project.discordActiveMembers = discord.active;
      await project.save();
    }
  }

  return discords;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { updateDiscord };

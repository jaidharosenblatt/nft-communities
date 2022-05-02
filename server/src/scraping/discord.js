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
      console.log(error.response.data);
      console.log(error.response.headers);
    }
    return undefined;
  }
}

async function updateDiscord() {
  const project = await Project.findOne();
  const data = await getDiscordFromUrl(project.discordUrl);
  return data;
  // const projects = await Project.find();

  // const discords = [];
  // await Promise.all(
  //   projects.map(async (project) => {
  //     if (project.discordUrl) {
  //       const data = await getDiscordFromUrl(project.discordUrl);
  //       console.log(data);

  //       if (data) {
  //         discords.push({ ...data, name: project.name });
  //       }
  //     }
  //   })
  // );

  // return discords;
}

module.exports = { updateDiscord };

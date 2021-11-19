const { twitterApi } = require("./api/axiosConfig");
const Project = require("./models/project");

async function getFollowers(username) {
  try {
    const res = await twitterApi.get(`/users/by/username/${username}`, {
      params: { "user.fields": "public_metrics" },
    });

    const followers = res.data?.public_metrics?.followers_count;
    return followers;
  } catch (error) {
    return -1;
  }
}

async function updateFollowers(_id) {
  const p = await Project.findById(_id);
  const followers = await getFollowers(p.twitter);
  if (followers != -1) {
    p.twitterFollowers = followers;
    await p.save();
    return true;
  }
  return false;
}

module.exports = { getFollowers, updateFollowers };

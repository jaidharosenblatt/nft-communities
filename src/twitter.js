const { twitterApi } = require("./api/axiosConfig");

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

module.exports = { getFollowers };

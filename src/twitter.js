const api = require("./api/axiosConfig");

async function getFollowers(username) {
  try {
    const res = await api.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        params: { "user.fields": "public_metrics" },
      }
    );

    const followers = res.data?.public_metrics?.followers_count;
    return followers;
  } catch (error) {
    return -1;
  }
}

module.exports = { getFollowers };

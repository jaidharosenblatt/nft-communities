const { twitterApi } = require("./api/axiosConfig");
const Project = require("./models/project");

async function updateAllFollowers() {
  const projects = await Project.find({});
  let usernames = await Promise.all(projects.map(async (p) => p.twitter));
  usernames = usernames.filter((username) => username !== undefined);
  const maxLimit = 5;
  let data = [];
  for (let i = 0; i < usernames.length; i += maxLimit) {
    const endSplice = Math.min(i + maxLimit, usernames.length);
    const usernamesSplice = usernames.splice(i, endSplice);
    const usernameQuery = usernamesSplice.join(",");

    const res = await twitterApi.get("/users/by", {
      params: {
        "user.fields": ["public_metrics", "profile_image_url"].join(","),
        usernames: usernameQuery,
      },
    });

    data = data.concat(res.data);
  }

  await Promise.all(
    data.map(async (d) => {
      if (d.public_metrics?.followers_count) {
        const followers = d.public_metrics?.followers_count;
        const p = await Project.findOne({ twitter: d.username.toLowerCase() });
        if (p) {
          p.twitterFollowers = followers;
          p.twitterId = d.id;
          p.avatar = d.profile_image_url;
          await p.save();
        }
      } else {
        await Project.deleteOne({ twitter: d.username });
      }
    })
  );
}

async function updateTweetEngagement() {
  const projects = await Project.find({}).sort("updatedAt").limit(100);

  await Promise.all(
    projects.map(async (project) => {
      if (!project.twitterId) {
        return;
      }
      const n = 10;
      const res = await twitterApi.get(`users/${project.twitterId}/mentions`, {
        params: { "tweet.fields": "public_metrics", max_results: n },
      });

      const mentions = res.data;
      let totalMentionLikes = 0;
      mentions.forEach(
        (mention) => (totalMentionLikes += mention.public_metrics.like_count)
      );

      const res2 = await twitterApi.get(`users/${project.twitterId}/tweets`, {
        params: { "tweet.fields": "public_metrics", max_results: 100 },
      });
      const tweets = res2.data;
      let totalTweetLikes = 0;
      let topNTweetLikes = 0;

      tweets.forEach((tweet, i) => {
        const likes = tweet.public_metrics.like_count;
        if (i < n) topNTweetLikes += likes;
        totalTweetLikes += likes;
      });

      project.twitterAverageNTweetEngagement = (topNTweetLikes / n).toFixed(2);
      project.twitterAverageTweetEngagement = (
        totalTweetLikes / tweets.length
      ).toFixed(2);
      project.twitterAverageMentionEngagement = (
        totalMentionLikes / mentions.length
      ).toFixed(2);
      project.twitterAverageEngagement = (
        (totalTweetLikes + totalMentionLikes) /
        (mentions.length + tweets.length)
      ).toFixed(2);
      await project.save();
    })
  );
}

module.exports = { updateAllFollowers, updateTweetEngagement };

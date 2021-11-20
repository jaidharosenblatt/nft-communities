const { twitterApi } = require("./api/axiosConfig");
const Moment = require("./models/moment");
const Project = require("./models/project");

async function updateAllFollowers() {
  const projects = await Project.find({});
  let usernames = await Promise.all(projects.map(async (p) => p.twitter));
  usernames = usernames.filter((username) => username !== undefined);
  const maxLimit = 5;
  let data = [];
  let errors = [];
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
    errors = errors.concat(res.errors);
  }

  errors = errors.filter((e) => e !== undefined);
  // delete all bad usernames (404 and banned users)
  await Promise.all(
    errors.map(async (e) => {
      await Project.deleteOne({ twitter: e.resource_id });
    })
  );

  // update followers info for each
  await Promise.all(
    data.map(async (d) => {
      const followers = d.public_metrics?.followers_count;
      const p = await Project.findOne({ twitter: d.username.toLowerCase() });
      if (p) {
        p.twitterFollowers = followers;
        p.twitterId = d.id;
        p.avatar = d.profile_image_url;
        await p.save();
      }
    })
  );
}

async function updateTweetEngagement() {
  const projects = await Project.find({}).sort("-updatedAt").limit(5);

  await Promise.all(
    projects.map(async (project) => {
      if (!project.twitterId) {
        return;
      }

      // Get updated followers
      const res0 = await twitterApi.get(`/users/${project.twitterId}`, {
        params: { "user.fields": "public_metrics" },
      });
      const twitterFollowers = res0.data.public_metrics?.followers_count;
      // number of tweets/mentions to draw from
      const n = 10;
      const res1 = await twitterApi.get(`users/${project.twitterId}/mentions`, {
        params: { "tweet.fields": "public_metrics", max_results: n },
      });

      // Get mentions and find likes average
      const mentions = res1.data;
      let totalMentionLikes = 0;
      mentions.forEach(
        (mention) => (totalMentionLikes += mention.public_metrics.like_count)
      );

      // Get tweets and find likes average
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

      // calc averages
      const twitterAverageNTweetEngagement = (topNTweetLikes / n).toFixed(2);
      const twitterAverageTweetEngagement = (
        totalTweetLikes / tweets.length
      ).toFixed(2);
      const twitterAverageMentionEngagement = (
        totalMentionLikes / mentions.length
      ).toFixed(2);
      const twitterAverageEngagement = (
        (totalTweetLikes + totalMentionLikes) /
        (mentions.length + tweets.length)
      ).toFixed(2);

      const updates = {
        twitterAverageNTweetEngagement,
        twitterAverageTweetEngagement,
        twitterAverageMentionEngagement,
        twitterAverageEngagement,
        twitterFollowers,
      };

      // only update values if none are undefined
      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          project[key] = updates[key];
        }
      });

      await project.save();

      const moment = new Moment(updates);

      await moment.save();
    })
  );
}

module.exports = { updateAllFollowers, updateTweetEngagement };

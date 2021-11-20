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
        console.log(d);
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

// async function update

module.exports = { updateAllFollowers };

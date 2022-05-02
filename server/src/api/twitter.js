const { twitterApi } = require("./axiosConfig");
const Moment = require("../models/moment");
const Project = require("../models/project");

async function updateAllFollowers() {
  const projects = await Project.find({});
  // twitter username regex
  const regex = new RegExp(/^[A-Za-z0-9_]{1,15}$/);

  const usernames = projects
    .filter((p) => p.twitter && regex.test(p.twitter))
    .map((p) => p.twitter);

  const maxLimit = 90;
  let data = [];

  for (let i = 0; i < usernames.length; i += maxLimit) {
    const endSlice = Math.min(i + maxLimit, usernames.length);
    const usernamesSlice = usernames.slice(i, endSlice);

    const usernameQuery = usernamesSlice.join(",");
    const res = await twitterApi.get("/users/by", {
      params: {
        "user.fields": ["public_metrics", "profile_image_url", "created_at"].join(","),
        usernames: usernameQuery,
      },
    });
    if (res.data) {
      data = data.concat(res.data);
    }
  }

  // get missing usernames by cross checking with data returned from twitter
  const missingUsernames = usernames.filter((username) => {
    const found = data.findIndex((d) => d?.username?.toLowerCase() === username);
    return found === -1;
  });

  // delete all error entries
  const blacklistedUsernames = usernames.filter((username) => ["home"].includes(username));

  const usernamesToDelete = [...blacklistedUsernames, ...missingUsernames];
  //delete all bad usernames (404 and banned users)
  await Promise.all(
    usernamesToDelete.map(async (username) => {
      await Project.deleteOne({ twitter: username });
    })
  );

  // update followers info for each
  await Promise.all(
    data.map(async (d, i) => {
      const followers = d.public_metrics?.followers_count;

      const p = await Project.findOne({ twitter: d.username.toLowerCase() });
      if (p) {
        p.twitterFollowers = followers;
        p.twitterId = d.id;
        p.avatar = d.profile_image_url;
        p.twitterCreatedAt = d.created_at;
        // create moment with this followers
        const moment = new Moment({ project: p._id, twitterFollowers: followers });

        await p.save();
        await moment.save();
      }
    })
  );
}

async function checkTwitterHandle(handle) {
  const res = await twitterApi.get(`/users/by/username/${handle}`, {
    params: { "user.fields": ["public_metrics", "profile_image_url", "created_at"].join(",") },
  });
  const data = res?.data;
  if (!data || data.errors) {
    return null;
  }
  const followers = res?.data.public_metrics?.followers_count;

  return {
    twitterId: data.id,
    twitterFollowers: followers,
    twitterCreatedAt: data.created_at,
    avatar: data.profile_image_url,
  };
}

module.exports = { checkTwitterHandle, updateAllFollowers };

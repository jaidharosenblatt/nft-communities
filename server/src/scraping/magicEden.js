const axios = require("axios");
const { getTwitterUsernameFromUrl, undefinedIfEmpty } = require("./util");

async function getMagicEdenProjects() {
  let allProjects = [];
  // get around 250 page limit
  await Promise.all(
    Array(10)
      .fill(null)
      .map(async (_, i) => {
        const projects = await getProjectsOffset(i);
        allProjects = [...allProjects, ...projects];
      })
  );
  return { length: allProjects.length };
}

async function getProjectsOffset(offset) {
  const res = await axios.get(`https://api-mainnet.magiceden.io/drops?limit=250&offset=${offset}`);

  if (!res.data || res.data.length === 0) {
    return [];
  }
  return res.data.map((p) => ({
    name: p.name,
    twitter: getTwitterUsernameFromUrl(p.links.twitter),
    twitterUrl: p.links.twitter,
    discordUrl: undefinedIfEmpty(p.links.discord),
    website: undefinedIfEmpty(p.links.website),
    releaseDate: new Date(p.launchDate).toString(),
    description: p.description,
    scrapingSource: "magicEden",
  }));
}

module.exports = { getMagicEdenProjects };

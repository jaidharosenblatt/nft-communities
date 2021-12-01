const axios = require("axios");
const { getTwitterUsernameFromUrl, convertQuantity } = require("./util");

async function getSolanartProjects() {
  const res = await axios.get("https://qzlsklfacc.medianetwork.cloud/get_collections");
  const projects = res.data || [];
  if (!projects) return [];
  return projects.map((p) => {
    if (p.twitter && p.name) {
      // date is in unix * 1000 for ms conversion
      const d = p.date ? new Date(p.date * 1000) : undefined;
      return {
        name: p.name,
        twitter: getTwitterUsernameFromUrl(p.twitter),
        twitterUrl: p.twitter,
        discordUrl: p.discord,
        website: p.website,
        releaseDate: d,
        quantity: convertQuantity(p.supply),
        description: p.description,
      };
    }
  });
}

module.exports = { getSolanartProjects };

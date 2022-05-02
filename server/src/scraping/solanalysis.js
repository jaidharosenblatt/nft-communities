const axios = require("axios");
const {
  getTwitterUsernameFromUrl,
  convertSolString,
  convertQuantity,
  undefinedIfEmpty,
} = require("./util");
const bodyParams = require("./solanalysisParams");

async function getSolanalysisProjects() {
  try {
    const res = await axios.post("https://beta.api.solanalysis.com/graphql", bodyParams);
    const projects = res.data?.data?.getUpcomingProjectsRaw?.upcoming_projects;
    if (!projects) return [];
    return projects.map((p) => {
      if (p.twitter && p.display_name) {
        const d = p.launch_date ? new Date(p.launch_date) : undefined;

        return {
          name: p.display_name,
          twitter: getTwitterUsernameFromUrl(p.twitter),
          twitterUrl: p.twitter,
          discordUrl: undefinedIfEmpty(p.discord),
          website: undefinedIfEmpty(p.website),
          price: convertSolString(p.price),
          quantity: convertQuantity(p.supply),
          releaseDate: d,
          description: p.description,
        };
      }
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = { getSolanalysisProjects };

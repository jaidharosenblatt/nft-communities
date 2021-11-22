const axios = require("axios");
const { getTwitterUsernameFromUrl, getDiscordIdFromUrl } = require("./util");
const bodyParams = require("./solanalysisParams");

async function getSolanalysisProjects() {
  const res = await axios.post(
    "https://solanalysis-graphql-dot-feliz-finance.uc.r.appspot.com/",
    bodyParams
  );
  const projects = res.data?.data?.getUpcomingProjects?.upcoming_projects;
  if (!projects) return [];
  return projects.map((p) => {
    if (p.twitter && p.display_name) {
      const d = p.launch_date ? new Date(p.launch_date) : undefined;
      return {
        name: p.display_name,
        twitter: getTwitterUsernameFromUrl(p.twitter),
        twitterUrl: p.twitter,
        discordUrl: p.discord,
        website: p.website,
        releaseDate: d,
        description: p.description,
      };
    }
  });
}

module.exports = { getSolanalysisProjects };

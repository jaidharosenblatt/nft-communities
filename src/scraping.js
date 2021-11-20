const axios = require("axios");
const cheerio = require("cheerio");

async function getHowRareProjects() {
  const { data } = await axios.get("https://howrare.is/drops");
  const $ = cheerio.load(data);
  let projects = [];

  // loop throgh each table row
  $("tr").each((i, e) => {
    let p = [];
    // add all text elements (not <a>)
    $(e)
      .find("td")
      .each((j, e2) => {
        p.push($(e2).text().trim());
      });

    const { discord, website, twitter } = gerUrls($, e);
    const project = {
      name: p[0],
      website,
      discord,
      twitter,
    };
    if (project.name) {
      projects.push(project);
    }
  });
  return projects;
}

function gerUrls($, e) {
  let urls = [];
  let twitter, website, discord;
  // Get links
  $(e)
    .find("td > a")
    .each((j, e2) => {
      urls.push($(e2).attr("href"));
    });

  urls.forEach((url) => {
    if (url.startsWith("https://twitter.com")) {
      const handle = url.split("https://twitter.com/")[1].toString();
      const withoutAt = handle.startsWith("@")
        ? handle.slice(1, handle.length)
        : handle;
      const withoutSlash = withoutAt.endsWith("/")
        ? withoutAt.slice(0, -1)
        : withoutAt;
      twitter = withoutSlash.toLowerCase();
    } else if (url.startsWith("https://discord.gg")) {
      const handle = url.split("https://discord.gg/")[1].toString();
      const withoutSlash =
        handle[-1] == "/" ? handle.slice(0, handle.length - 1) : handle;
      discord = withoutSlash;
    } else {
      website = url;
    }
  });
  return { discord, website, twitter };
}

module.exports = { getHowRareProjects };

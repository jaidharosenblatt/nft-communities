const axios = require("axios");
const cheerio = require("cheerio");

async function getHowRareProjects() {
  const { data } = await axios.get("https://howrare.is/drops");
  const $ = cheerio.load(data);
  let projects = [];
  let releaseDate;
  $("div.col")
    .children()
    .each((i, e) => {
      // get date by finding calendar icon and going to it's parent
      const date = $(e).find("i.far.fa-calendar-alt").parent().text().trim();
      // skip newlines
      if (date != "") {
        releaseDate = convertDateString(date);
      }

      // loop throgh each table row
      $(e)
        .find("tr")
        .each((j, e2) => {
          let p = [];
          // add all text elements (not <a>)
          $(e2)
            .find("td")
            .each((j, e3) => {
              p.push($(e3).text().trim());
            });
          const { discord, website, twitter } = gerUrls($, e2);
          const project = {
            name: p[0],
            website,
            discord,
            twitter,
            releaseDate,
            description: p[5] === "" ? undefined : p[5],
          };
          if (project.name && project.twitter) {
            projects.push(project);
          }
        });
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
      urls.push($(e2).attr("href").toLowerCase());
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
      twitter = withoutSlash;
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

function convertDateString(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (date === "No date specified yet") return undefined;
  const [monthStr, dayStr] = date.split(" ");
  const month = months.findIndex((str) => str === monthStr) + 1;
  const day = parseInt(dayStr);
  const now = new Date();
  // year + 1 if we have already passed the specified month
  const year =
    month < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();

  return new Date(`${month}/${day}/${year}`);
}

module.exports = { getHowRareProjects };

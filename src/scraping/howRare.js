const axios = require("axios");
const cheerio = require("cheerio");
const { getTwitterUsernameFromUrl, getDiscordIdFromUrl } = require("./util");

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
          const twitterUrl = $(e2).find("i.fab.fa-twitter").parent().attr("href");
          const discordUrl = $(e2).find("i.fab.fa-discord").parent().attr("href");
          const website = $(e2).find("i.fab.fab.fa-firefox").parent().attr("href");
          const twitter = getTwitterUsernameFromUrl(twitterUrl);
          const project = {
            name: p[0],
            website,
            twitter,
            discordUrl,
            twitterUrl,
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
  const year = month < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();

  return new Date(`${month}/${day}/${year}`);
}

module.exports = { getHowRareProjects };

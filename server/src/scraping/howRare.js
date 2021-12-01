const axios = require("axios");
const cheerio = require("cheerio");
const { getTwitterUsernameFromUrl, convertQuantity, convertSolString } = require("./util");

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
          const children = $(e2).find("td").children().length;
          // add all text elements (not <a>)
          const name = $(e2).find("td:nth-child(1)").text().trim();
          const quantity = $(e2).find("td:nth-last-child(3)").text().trim();
          const price = $(e2).find("td:nth-last-child(2)").text().trim();
          const description = $(e2).find("td:last-child").text().trim();
          const priceNumber = convertSolString(price);
          const quantityNumber = convertQuantity(quantity);

          const twitterUrl = $(e2).find("i.fab.fa-twitter").parent().attr("href");
          const discordUrl = $(e2).find("i.fab.fa-discord").parent().attr("href");
          const website = $(e2).find("i.fab.fab.fa-firefox").parent().attr("href");

          const twitter = getTwitterUsernameFromUrl(twitterUrl);
          const project = {
            name,
            website: undefinedIfEmpty(website),
            quantity: quantityNumber,
            price: priceNumber,
            twitter,
            discordUrl: undefinedIfEmpty(discordUrl),
            twitterUrl,
            releaseDate,
            description: undefinedIfEmpty(description),
          };
          if (project.name && project.twitter) {
            projects.push(project);
          }
        });
    });
  return projects;
}

function undefinedIfEmpty(str) {
  return str === "" ? undefined : str;
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

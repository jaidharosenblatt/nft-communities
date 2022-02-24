const axios = require("axios");
const cheerio = require("cheerio");
const {
  getTwitterUsernameFromUrl,
  convertQuantity,
  convertSolString,
  undefinedIfEmpty,
} = require("./util");

async function getHowRareProjects() {
  const { data } = await axios.get("https://howrare.is/drops");
  const $ = cheerio.load(data);
  let projects = [];
  let releaseDate;

  $(".all_collections")
    .children()
    .each((i, e) => {
      // get date by finding calendar icon and going to it's parent
      const date = $(e).find("div.all_coll_row.drop_date img").parent().text().trim();
      // skip newlines
      if (date != "") {
        releaseDate = convertDateString(date);
      }

      // get all rows since all_coll_row doesn't work
      const rows = $(e)
        .find("div.all_coll_col a span")
        .map((a, elem) => {
          const text = $(elem).text().trim();
          if (text.length > 0) {
            return $(elem).parent().parent().parent();
          }
        });

      // loop throgh each table row
      rows.each((j, e2) => {
        // add all text elements (not <a>)
        const name = $(e2).find(":nth-child(1) a span").text().trim();
        const quantity = $(e2).find(":nth-last-child(3)").text().trim();
        const price = $(e2).find(":nth-last-child(2)").text().trim();
        const priceNumber = convertSolString(price);
        const quantityNumber = convertQuantity(quantity);

        const socials = $(e2).find(".drop_links");
        const { twitterUrl, discordUrl, website } = getSocials($, socials);
        const twitter = getTwitterUsernameFromUrl(twitterUrl);

        const project = {
          name,
          quantity: quantityNumber,
          price: priceNumber,
          releaseDate,
          twitter,
          website: undefinedIfEmpty(website),
          discordUrl: undefinedIfEmpty(discordUrl),
          twitterUrl,
        };

        if (project.name && project.twitter) {
          projects.push(project);
        }
      });
    });
  return projects;
}

function getSocials($, socials) {
  let twitterUrl, discordUrl, website;
  $(socials)
    .find("a")
    .each((i, e) => {
      const image = $(e).find("img").attr("src");
      const url = $(e).attr("href");

      if (image === "/n/img/discord.svg") {
        discordUrl = url;
      } else if (image === "/n/img/twitter.svg") {
        twitterUrl = url;
      } else if (image === "/n/img/link.svg") {
        website = url;
      }
    });
  return { twitterUrl, discordUrl, website };
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

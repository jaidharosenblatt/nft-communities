const axios = require("axios");
const cheerio = require("cheerio");
const {
  getTwitterUsernameFromUrl,
  convertQuantity,
  convertSolString,
  undefinedIfEmpty,
} = require("./util");

async function getNextDrop() {
  const { data } = await axios.get("https://nextdrop.is/upcoming?chain=solana");
  const $ = cheerio.load(data);
  let projects = [];
  $("tbody > tr").each((i, e) => {
    // add all text elements (not <a>)
    const date = $(e).find("td:nth-child(1) > span").text().trim();
    const name = $(e).find("td:nth-child(3)").text().trim();
    const quantity = $(e).find("td:nth-child(4)").text().trim();
    const price = $(e).find("td:nth-child(5)").text().trim();

    const twitterUrl = $(e).find("td:nth-child(8) > span > a").attr("href");
    const discordUrl = $(e).find("td:nth-child(7) > span > a").attr("href");
    const website = $(e).find("td:nth-child(6) > span > a").attr("href");

    const priceNumber = convertSolString(price);
    const quantityNumber = convertQuantity(quantity);

    const twitter = getTwitterUsernameFromUrl(twitterUrl);
    const project = {
      name,
      releaseDate: new Date(date),
      website: undefinedIfEmpty(website),
      quantity: quantityNumber,
      price: priceNumber,
      twitter,
      discordUrl: undefinedIfEmpty(discordUrl),
      twitterUrl,
      scrapingSource: "nextDrop",
    };
    if (project.name && project.twitter) {
      projects.push(project);
    }
  });
  return projects;
}

module.exports = { getNextDrop };

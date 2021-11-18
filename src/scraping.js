const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeHowRare() {
  const { data } = await axios.get("https://howrare.is/drops");
  const $ = cheerio.load(data);
  let twitterHandles = [];
  $("tr > td > a").each((i, e) => {
    const entry = $(e).attr("href");
    if (entry.startsWith("https://twitter.com")) {
      const handle = entry.split("https://twitter.com/")[1].toString();
      const withoutAt = handle.startsWith("@")
        ? handle.slice(1, handle.length)
        : handle;
      twitterHandles.push(withoutAt);
    }
  });
  return twitterHandles;
}

module.exports = { scrapeHowRare };

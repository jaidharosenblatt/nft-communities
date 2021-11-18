/**
 * @TODO
 * Interaction of latest tweets
 * Scrape more websites
 * Discord activity
 * Track growing communities and simple graphs over time
 * Open Sea
 * Reset twitter API
 */

const axios = require("axios");
const cheerio = require("cheerio");
const { getFollowers } = require("./twitter");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "handle", title: "Handle" },
    { id: "followers", title: "followers" },
  ],
});

async function getTwitterHandles() {
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

async function main() {
  const handles = await getTwitterHandles();
  let data = [];
  const some = handles.slice(0, 50);
  try {
    await Promise.all(
      some.map(async (handle) => {
        const followers = await getFollowers(handle);
        data.push({ followers, handle });
      })
    );
  } catch (error) {
    console.log(error.response.data);
  }

  csvWriter.writeRecords(data);
}

main();

/**
 * @TODO
 * Interaction of latest tweets
 * Scrape more websites
 * Discord activity
 * Track growing communities and simple graphs over time
 * Open Sea
 */

const axios = require("axios");
const cheerio = require("cheerio");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "handle", title: "Handle" },
    { id: "followers", title: "followers" },
  ],
});

const token =
  "AAAAAAAAAAAAAAAAAAAAAHOqVwEAAAAAeWMtQR%2BWYGJ6512mo5ClDo2SbjI%3Dwq4W9EuUhRig9N6Ua10UIUM3UVL6xBV89PDKTKc0BWn15UUnVW";
const twitter = axios.create({
  baseURL: "https://api.twitter.com/2",
  timeout: 1000,
  headers: { Authorization: "Bearer " + token },
});

async function getFollowers(username) {
  const res = await twitter.get(
    `https://api.twitter.com/2/users/by/username/${username}`,
    {
      params: { "user.fields": "public_metrics" },
    }
  );
  if (res.status !== 200) {
    return -1;
  }
  const followers = res?.data.data?.public_metrics?.followers_count;
  return followers;
}

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
  const some = handles.slice(100, 300);
  try {
    await Promise.all(
      some.map(async (handle) => {
        const followers = await getFollowers(handle);
        data.push({ followers, handle });
      })
    );
  } catch (error) {
    console.log(error);
  }

  csvWriter.writeRecords(data);
}

main();

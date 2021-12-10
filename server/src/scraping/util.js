function getTwitterUsernameFromUrl(url) {
  if (!url) {
    return undefined;
  }

  // ordered in reverse priority
  const twitterPrefixes = [
    "https://www.twitter.com/",
    "http://www.twitter.com/",
    "http://twitter.com/",
    "https://twitter.com/",
    "http://twitter.com/@",
    "https://mobile.twitter.com/",
    "https://twitter.com/@",
    "twitter.com/",
  ];
  const urlLowerCase = url.toLowerCase().trim();
  let usernamePost = urlLowerCase;
  let match = false;
  twitterPrefixes.forEach((prefix) => {
    if (urlLowerCase.startsWith(prefix)) {
      usernamePost = urlLowerCase.split(prefix)[1].toString();
      match = true;
    }
  });
  // remove trailing chars from end ex https://twitter.com/username?s=20
  const trailingChars = ["/", "?"];
  let username = usernamePost;
  trailingChars.forEach((char) => {
    if (usernamePost.includes(char)) username = usernamePost.split(char)[0];
  });
  return match ? username : undefined;
}

function undefinedIfEmpty(str) {
  return str === "" || str === "none" ? undefined : str;
}

function getDiscordIdFromUrl(url) {
  if (!url) {
    return undefined;
  }
  const urlLowerCase = url.toLowerCase();
  let id = "";

  // ordered in reverse priority
  const discordUrlVariations = [
    "http://discord.gg/",
    "discord.gg/",
    "https://discord.com/",
    "https://discord.gg/",
    "https://discord.gg/",
    "https://discord.com/invite/",
    "https://discord.com/invite/",
    "http://discord.com/invite/",
  ];

  discordUrlVariations.forEach((prefix) => {
    if (urlLowerCase.startsWith(prefix)) {
      id = urlLowerCase.split(prefix)[1].toString();
    }
  });
  if (id === "") {
    return undefined;
  }
  return id.endsWith("/") ? id.slice(0, id.length - 1) : id;
}

function convertSolString(price) {
  if (!price || price === "TBA") return undefined;
  const pre = price.split(" SOL")[0];
  let num = 0;
  if (pre.includes("-")) {
    num = parseFloat(pre.split("-")[0]);
  }
  num = parseFloat(pre);
  return isNaN(num) ? undefined : num;
}

function convertQuantity(quantity) {
  if (!quantity) return undefined;
  const num = parseInt(quantity.toString().replace(/,/g, ""));

  return isNaN(num) ? undefined : num;
}

module.exports = {
  getTwitterUsernameFromUrl,
  getDiscordIdFromUrl,
  convertSolString,
  convertQuantity,
  undefinedIfEmpty,
};

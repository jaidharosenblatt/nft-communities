function getTwitterUsernameFromUrl(url) {
  if (!url) {
    return undefined;
  }
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://twitter.com/")[1].toString();
  const withoutAt = handle.startsWith("@")
    ? handle.slice(1, handle.length)
    : handle;

  return withoutAt.endsWith("/") ? withoutAt.slice(0, -1) : withoutAt;
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

module.exports = {
  getTwitterUsernameFromUrl,
  getDiscordIdFromUrl,
};

function getTwitterUsernameFromUrl(url) {
  if (!url) {
    return undefined;
  }
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://twitter.com/")[1].toString();
  const withoutAt = handle.startsWith("@") ? handle.slice(1, handle.length) : handle;
  // remove trailing chars from end ex https://twitter.com/username?s=20
  const trailingChars = ["/", "?"];
  let username = withoutAt;
  trailingChars.forEach((char) => {
    if (withoutAt.includes(char)) username = withoutAt.split(char)[0];
  });
  return username;
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

function getTwitterUsernameFromUrl(url) {
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://twitter.com/")[1].toString();
  const withoutAt = handle.startsWith("@")
    ? handle.slice(1, handle.length)
    : handle;
  return withoutAt.endsWith("/") ? withoutAt.slice(0, -1) : withoutAt;
}

function getDiscordIdFromUrl(url) {
  const urlLowerCase = url.toLowerCase();
  const handle = urlLowerCase.split("https://discord.gg/")[1].toString();
  return handle.endsWith("/") ? handle.slice(0, handle.length - 1) : handle;
}

module.exports = {
  getTwitterUsernameFromUrl,
  getDiscordIdFromUrl,
};

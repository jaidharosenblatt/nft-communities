const axios = require("axios");

const twitterApi = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: { Authorization: "Bearer " + process.env.TWITTER_BEARER },
});

function handleResponse(res) {
  return res.data;
}
function handleError(e) {
  const error = { code: e.response?.status || 500, data: e.response?.data };
  const DEBUG = true;
  if (DEBUG) {
    if (!e.response) {
      // console.log(e);
    } else {
      console.error(error);
    }
  }

  return Promise.reject(error);
}
twitterApi.interceptors.response.use(handleResponse, handleError);

module.exports = { twitterApi };

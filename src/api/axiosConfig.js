const axios = require("axios");

const token =
  "AAAAAAAAAAAAAAAAAAAAAHOqVwEAAAAAeWMtQR%2BWYGJ6512mo5ClDo2SbjI%3Dwq4W9EuUhRig9N6Ua10UIUM3UVL6xBV89PDKTKc0BWn15UUnVW";
const api = axios.create({
  baseURL: "https://api.twitter.com/2",
  timeout: 1000,
  headers: { Authorization: "Bearer " + token },
});

function handleResponse(res) {
  return res.data;
}
function handleError(e) {
  const error = { code: e.response?.status, data: e.response?.data };
  console.error(error);
  return Promise.reject(error);
}
api.interceptors.response.use(handleResponse, handleError);

module.exports = api;

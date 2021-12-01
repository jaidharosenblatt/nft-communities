import axios from "axios";
const useProd = false;
export const api = axios.create({
  baseURL:
    !useProd && process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://movemints.herokuapp.com/",
});

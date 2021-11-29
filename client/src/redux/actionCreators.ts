import axios from "axios";
import { api } from "../api";
import { setProjects, setCount, setAggregation } from "./projects";
import { setDarkMode, setError } from "./status";
import { setLoading } from "./status";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(undefined));

    const params = getState().filters;
    const { skip, limit } = getState().projects;
    const {
      name,
      twitterFollowers,
      twitterAverageMentionEngagement,
      twitterAverageTweetEngagement,
    } = params;

    // use regex for name query
    const nameQuery = !name || name === "" ? undefined : { $regex: name, $options: "i" };

    const res = await api.get("projects", {
      params: {
        ...params,
        filters: {
          name: nameQuery,
          twitterFollowers,
          twitterAverageMentionEngagement,
          twitterAverageTweetEngagement,
        },
        limit,
        skip,
      },
    });
    dispatch(setCount(res.data.count));
    const projects: Project[] = res.data.projects;
    dispatch(setProjects(projects));
    dispatch(setLoading(false));
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      dispatch(setError("Server is currently down. Please come back later"));
    } else {
      dispatch(setError("Please refresh the page"));
    }
  }
};

export const getLastUpdated = (): AppThunk => async (dispatch) => {
  const res = await api.get("aggregate");
  const aggregation: Aggregation = res.data;
  dispatch(setAggregation(aggregation));
};

export const setButtonDarkMode =
  (darkMode: boolean): AppThunk =>
  async (dispatch) => {
    const value = darkMode ? "dark" : "light";
    localStorage.setItem("theme", value);
    dispatch(setDarkMode(darkMode));
    window.location.reload();
  };

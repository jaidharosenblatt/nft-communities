import axios from "axios";
import { api, updateHeaders } from "../api";
import { setGraphProject } from "./graph";
import { setProjects, setCount, setAggregation } from "./projects";
import { setDarkMode, setError, setManualRefresh } from "./status";
import { setLoading } from "./status";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(undefined));
    const header: ApiHeader = updateHeaders();

    const params = getState().filters;
    const { skip, limit } = getState().projects;
    const {
      name,
      twitterFollowers,
      twitterAverageMentionEngagement,
      twitterAverageTweetEngagement,
      price,
      quantity,
    } = params;

    // use regex for name query
    const nameQuery = !name || name === "" ? undefined : { $regex: name, $options: "i" };

    const res = await api.get("projects", {
      headers: { ...header },
      params: {
        ...params,
        filters: {
          name: nameQuery,
          twitterFollowers,
          twitterAverageMentionEngagement,
          twitterAverageTweetEngagement,
          price,
          quantity,
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
  const header: ApiHeader = updateHeaders();

  const res = await api.get("aggregate", { headers: { ...header } });
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

export const setHighlightedProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const projects = getState().projects.projects;
    const withoutProject = projects.filter((p) => p._id !== project._id);
    dispatch(setProjects(withoutProject));
    dispatch(setGraphProject(project));
  };

export const closeHighlightedProject = (): AppThunk => async (dispatch) => {
  dispatch(setGraphProject(undefined));
  dispatch(getProjects());
};

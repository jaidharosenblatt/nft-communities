import { api } from "../api";
import { setProjects, setCount, setAggregation } from "./projects";
import { setDarkMode } from "./status";
import { setLoading } from "./status";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const params = getState().filters;
  const { twitterFollowers, twitterAverageMentionEngagement, twitterAverageTweetEngagement } =
    params;

  const res = await api.get("projects", {
    params: {
      ...params,
      filters: { twitterFollowers, twitterAverageMentionEngagement, twitterAverageTweetEngagement },
    },
  });
  dispatch(setCount(res.data.count));
  const projects: Project[] = res.data.projects;
  dispatch(setProjects(projects));
  dispatch(setLoading(false));
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

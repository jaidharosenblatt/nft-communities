import { api } from "../api";
import { setProjects, setCount, setFirstUpdated } from "./projects";
import { setDarkMode } from "./status";
import { setLoading } from "./status";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const filters = getState().filters;
  const res = await api.get("projects", {
    params: filters,
  });
  dispatch(setCount(res.data.count));
  const projects: Project[] = res.data.projects;
  dispatch(setProjects(projects));
  dispatch(setLoading(false));
};

export const getLastUpdated = (): AppThunk => async (dispatch) => {
  const res = await api.get("aggregate");
  const aggregation: Aggregation = res.data;
  dispatch(setFirstUpdated(aggregation.lastMoment));
};

export const setButtonDarkMode =
  (darkMode: boolean): AppThunk =>
  async (dispatch) => {
    const value = darkMode ? "dark" : "light";
    localStorage.setItem("theme", value);
    dispatch(setDarkMode(darkMode));
    window.location.reload();
  };

// params: {
//           sortBy: "releaseDate",
//           sortDirection: sortDirectionIsDesc ? "desc" : "asc",
//           filters: { twitterFollowers: { $gte: 5000 } },
//           limit: 100,
//           startDate: new Date().toString(),
//         },

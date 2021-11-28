import { api } from "../api";
import { setProjects, setCount, setFirstUpdated } from "./projects";
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

export const getLastUpdated = (): AppThunk => async (dispatch, getState) => {
  const res = await api.get("aggregate");
  const aggregation: Aggregation = res.data;
  dispatch(setFirstUpdated(aggregation.lastMoment));
};

// params: {
//           sortBy: "releaseDate",
//           sortDirection: sortDirectionIsDesc ? "desc" : "asc",
//           filters: { twitterFollowers: { $gte: 5000 } },
//           limit: 100,
//           startDate: new Date().toString(),
//         },

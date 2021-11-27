import { api } from "../api";
import { setProjects, setCount } from "./projects";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch, getState) => {
  const filters = getState().filters;
  const res = await api.get("projects", { params: filters });
  dispatch(setCount(res.data.count));
  const projects: Project[] = res.data.projects;
  dispatch(setProjects(projects));
};

// params: {
//           sortBy: "releaseDate",
//           sortDirection: sortDirectionIsDesc ? "desc" : "asc",
//           filters: { twitterFollowers: { $gte: 5000 } },
//           limit: 100,
//           startDate: new Date().toString(),
//         },

import { api } from "../api";
import { setProjects, setCount } from "./projects";
import { AppThunk } from "./store";

export const getProjects = (): AppThunk => async (dispatch) => {
  const res = await api.get("projects");
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

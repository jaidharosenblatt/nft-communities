import "./App.css";
import { useEffect } from "react";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLastUpdated, getProjects } from "../redux/actionCreators";
import ThemeSelector from "../themes/ThemeSelector";
import { notification, Skeleton } from "antd";
import { setError } from "../redux/status";
import PaginationCard from "./form/PaginationCard";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects);
  const filters = useAppSelector((state) => state.filters);
  const { darkMode, loading, error } = useAppSelector((state) => state.status);

  useEffect(
    function (): () => void {
      if (error) {
        notification.error({
          message: "Something went wrong...",
          description: error,
        });
      } else {
        dispatch(getProjects());
        dispatch(getLastUpdated());
      }

      return () => {
        if (error) {
          dispatch(setError(undefined));
        }
      };
    },
    [error, dispatch, projects.skip, projects.limit, filters]
  );

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Filters />
        <Navbar />

        <div className="pagination-card-top">
          <PaginationCard />
        </div>
        <div className="projects-holder">
          {loading && projects.count === 0 ? (
            <Skeleton />
          ) : (
            projects.projects.map((p: Project, i) => <ProjectCard key={i} project={p} />)
          )}
        </div>
        <div className="pagination-card-bottom">
          <PaginationCard />
        </div>
      </div>
    </ThemeSelector>
  );
}

export default App;

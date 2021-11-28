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

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
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
    [dispatch, filters, error]
  );

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Filters />
        <Navbar />

        <div className="projects-holder">
          {loading ? (
            <Skeleton />
          ) : (
            projects.map((p: Project) => <ProjectCard key={p._id} project={p} />)
          )}
        </div>
      </div>
    </ThemeSelector>
  );
}

export default App;
